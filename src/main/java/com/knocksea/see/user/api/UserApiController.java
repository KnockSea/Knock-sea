package com.knocksea.see.user.api;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.user.dto.request.LoginRequestDTO;
import com.knocksea.see.user.dto.request.UserDeleteRequest;
import com.knocksea.see.user.dto.request.UserModifyRequestDTO;
import com.knocksea.see.user.dto.request.UserRegisterRequestDTO;
import com.knocksea.see.user.dto.response.EntireInfoResponseDTO;
import com.knocksea.see.user.dto.response.LoginResponseDTO;
import com.knocksea.see.user.dto.response.UserModifyresponseDTO;
import com.knocksea.see.exception.DuplicatedEmailException;
import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.user.dto.response.UserMyPageResponseDTO;
import com.knocksea.see.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.FileCopyUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserApiController {


    //    @Value("${file.upload.root-path}")
//    private String rootPath;
    private final UserService userService;


    //이메일 중복확인 처리 요청
    @GetMapping("/check")
    public ResponseEntity<?> check(String userEmail){
        if (userEmail.trim().equals("")){
            return ResponseEntity.badRequest().body("이메일이 없습니다!");
        }
        boolean resultFlag =userService.isDuplicate(userEmail);
        log.info("{} 중복?? - {}",userEmail,resultFlag);

        return ResponseEntity.ok().body(resultFlag);
    }

    //회원가입 요청
    //post : /api/v1/user/register
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Validated @RequestPart("user")  UserRegisterRequestDTO dto
    ,@RequestPart(value = "profileImage", required = false) MultipartFile profileImg,
                                           BindingResult result) {
        //값 들어오는지 확인
        log.info("/user/register POST! --{}", dto);


//        String savePath = null;
//        if (!profileImage.isEmpty()) {
//            savePath = FileUtil.uploadFile(dto.getProfileImage(), rootPath);
//        }

        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldError());
        }
        try {
            String uploadedFilePath =null;
            if(profileImg!=null) {
                log.info("attatched file name : {}", profileImg.getOriginalFilename());


                uploadedFilePath = userService.uploadProfileImage(profileImg);
            }

            boolean join = userService.join(dto,uploadedFilePath);
            return ResponseEntity.ok().body(join);
        } catch (NoRegisteredArgumentsException e) {
            log.warn("필수 가입 정보를 받지 못했습니다.");
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (DuplicatedEmailException e) {
            log.warn("이메일이 중복되었습니다");
            return ResponseEntity.badRequest().body(e.getMessage());
        }catch (Exception e){
            log.warn("기타 예외가 발생했습니다");
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }

    }

    //회원 정보 수정 요청
    //put : /api/v1/user/modify
    @RequestMapping(value = "/modify", method = {RequestMethod.PUT, RequestMethod.PATCH})
    public ResponseEntity<?> modifyUser(
            @Validated @RequestPart("user")  UserModifyRequestDTO dto,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImg,
            @AuthenticationPrincipal TokenUserInfo userInfo, BindingResult result) {
        //값 들어오는지 확인
        log.info("/user/modify PUT! --{}", dto);
        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldError());
        }


        try {

            if(profileImg!=null) {
                log.info("attatched file name : {}", profileImg.getOriginalFilename());

                log.info("userInfo : {}",userInfo);

                userService.modifyProfileImage(profileImg,userInfo.getUserId());
            }


            UserModifyresponseDTO modify = userService.modify(dto,userInfo);
            return ResponseEntity.ok().body(modify);
        } catch (NoRegisteredArgumentsException e) {
            log.warn("필수 가입 정보를 받지 못했습니다.");
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    //로그인 요청
    @PostMapping("/signin")
    public ResponseEntity<?> signIn(
            @Validated @RequestBody LoginRequestDTO dto
    ){
        try{
            LoginResponseDTO responseDTO = userService.authenticate(dto);
            return ResponseEntity.ok().body(responseDTO);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //회원탈퇴 요청
    @DeleteMapping("/userDelete")
    public ResponseEntity<?> removeUser(
            @Validated @RequestBody UserDeleteRequest dto,
            @AuthenticationPrincipal TokenUserInfo userInfo, BindingResult result
            ){
        //값 들어오는지 확인
        log.info("/user/modify DELETE! --{}", dto);

        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldError());
        }


        try {
            boolean deleteResult = userService.deleteUser(dto,userInfo);
            return ResponseEntity.ok().body(deleteResult);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    //프로필 사진 이미지 데이터를 클라이언트에게 응답처리
//    @GetMapping("/load-profile")
//    public ResponseEntity<?> loadFile(
//            @AuthenticationPrincipal TokenUserInfo userInfo
//    ){
//        log.info("api/auth/load-profile GET ! - user :{}",userInfo.getUserEmail());
//
//        try {
//            //클라이언트가 요청한 프로필 사진을 응답해야함
//
//            //1. 프로필 사진의 경로를 얻어야함.
//            String filePath = userService.findProfilePath(userInfo.getUserId());
//            //2. 이 얻어낸 파일 경로를 통해서 실제 파일데이터 로드하기
//            File profileFile = new File(filePath);
//
//            if(!profileFile.exists()){
//                return ResponseEntity.notFound().build();
//            }
//
//            //해당 경로에 저장된 이미지파일을 바이트배열로 직렬화해서 리턴
//            byte[] fileData = FileCopyUtils.copyToByteArray(profileFile);
//
//            //3. 응답 헤더에 컨텐츠 타입을 설정
//            HttpHeaders headers = new HttpHeaders();
//            MediaType contentType = findExtensionAndGetMediaType(filePath);
//            if(contentType==null){
//                return ResponseEntity.internalServerError().body("발견된 파일은 이미지파일이 아닙니다");
//            }
//            headers.setContentType(contentType);
//            return ResponseEntity.ok().headers(headers).body(fileData);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return ResponseEntity.internalServerError().body("파일을 찾을 수 없습니다.");
//        }
//
//
//    }


    //파일 이미지 검증
    private MediaType findExtensionAndGetMediaType(String filePath) {
        //파일 경로에서 확장자 추출하기
        //D:/todo_upload/kfasdasdsa_abc.jpg
        String ext = filePath.substring(filePath.lastIndexOf(".") + 1);

        switch (ext.toUpperCase()){
            case "JPG": case "JPEG":
                return MediaType.IMAGE_JPEG;
            case "PNG":
                return MediaType.IMAGE_PNG;
            case "GIF":
                return MediaType.IMAGE_GIF;
            default:
                return null;
        }
    }

    //내 상품들에 붙은 후기 평점 평균 모두 가져오기 OWNER가 보는 mypage
    @GetMapping("/load-myList")
    public ResponseEntity<?> loadEntireInfo(
            @AuthenticationPrincipal TokenUserInfo userInfo
    ){

        try {
            EntireInfoResponseDTO entireInfo = userService.getEntireInfo(userInfo);
            return ResponseEntity.ok().body(entireInfo);

        }catch (Exception e){
            return ResponseEntity.badRequest().body("좋아요/리뷰 리스트를 얻어오는데 실패했습니다");
        }


    }
    @GetMapping("/load-s3")
    public ResponseEntity<?> loadS3(
            @AuthenticationPrincipal TokenUserInfo userInfo
    ){
        log.info("/api/auth/load-s3 GET - user : {}",userInfo);

        try {
            String profilePath = userService.findProfilePath(userInfo.getUserId());
            return ResponseEntity.ok().body(profilePath);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/user-mylist")
    public ResponseEntity<?> userMyPage(@AuthenticationPrincipal TokenUserInfo userInfo) {
        try {
            UserMyPageResponseDTO mypageDTO = userService.userMyPageInfo(userInfo);
            return ResponseEntity.ok().body(mypageDTO);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }





}
