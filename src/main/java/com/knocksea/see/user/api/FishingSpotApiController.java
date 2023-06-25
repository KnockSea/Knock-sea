package com.knocksea.see.user.api;


import com.knocksea.see.auth.TokenProvider;
import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.exception.DuplicatedEmailException;
import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.user.dto.request.FishingModifyRequestDTO;
import com.knocksea.see.user.dto.request.FishingSpotRegisterRequestDTO;
import com.knocksea.see.user.dto.request.ShipModifyRequestDTO;
import com.knocksea.see.user.dto.request.ShipRegisterRequestDTO;
import com.knocksea.see.user.dto.response.*;
import com.knocksea.see.user.entity.FishingSpot;
import com.knocksea.see.user.service.FishingSpotService;
import com.knocksea.see.user.service.ImageService;
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
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/fishing")
public class FishingSpotApiController {

    private final FishingSpotService fishingSpotService;


    private final ImageService imageService;

    @Value("${upload.path}")
    private String uploadRootPath2;

    //낚시터 등록 요청
    //post : /api/v1/fishing/register
    @PostMapping("/register")
    public ResponseEntity<?> registerShip(@Validated @RequestPart("spot") FishingSpotRegisterRequestDTO dto,
                                          @RequestPart(value = "spotImage", required = false) List<MultipartFile> spotImages,
                                          @AuthenticationPrincipal TokenUserInfo userInfo
            , BindingResult result) {
        //값 들어오는지 확인
        log.info("/fishing/register POST! --{}", dto);


//        String savePath = null;
//        if (!profileImage.isEmpty()) {
//            savePath = FileUtil.uploadFile(dto.getProfileImage(), rootPath);
//        }

        if (result.hasErrors()) {
            log.warn("DTO 검증 에러 발생 : {}", result.getFieldError());
            return ResponseEntity
                    .badRequest()
                    .body(result.getFieldError());
        }
        try {
            FishingSpotRegisterResponseDto fishingSpotRegisterResponseDto = fishingSpotService.save(dto, userInfo.getUserId());

            if(spotImages!=null) {
                //이미지 파일들이 잘 들어왔다면 원본이름 출력시키기
                for (MultipartFile shipImage : spotImages) {
                    log.info(shipImage.getOriginalFilename());
                }
                //이미지 저장시키기
                imageService.saveSpotImages(spotImages, userInfo);
            }

            return ResponseEntity.ok().body(fishingSpotRegisterResponseDto);
        } catch (NoRegisteredArgumentsException e) {
            log.warn("필수 등록 정보를 받지 못했습니다.");
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (DuplicatedEmailException e) {
            log.warn("이메일이 중복되었습니다");
            return ResponseEntity.badRequest().body(e.getMessage());
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }


    //낚시터 정보 수정 요청
    //post : /api/v1/fishing/modify
    @RequestMapping(value = "/modify", method = {RequestMethod.PUT, RequestMethod.PATCH})
    public ResponseEntity<?> modifySpot(
            @Validated @RequestPart("spot") FishingModifyRequestDTO dto,
            @RequestPart(value = "spotImage", required = false) List<MultipartFile> spotImages
            ,@AuthenticationPrincipal TokenUserInfo userInfo, BindingResult result) throws IOException {

        //값 들어오는지 확인
        log.info("/user/register PUT! --{}", dto);

        if (result.hasErrors()) {
            log.warn("DTO 검증 에러 발생 : {}", result.getFieldError());
            return ResponseEntity
                    .badRequest()
                    .body(result.getFieldError());
        }

        if(spotImages!=null){
            for (MultipartFile spotImage : spotImages) {
                log.info("shipImages : {}",spotImage);
            }
            imageService.modifySpotImages(spotImages,userInfo);
        }

        try{
            FishingSpotModifyResponseDTO modify = fishingSpotService.modify(dto, userInfo);
            return ResponseEntity.ok().body(modify);

        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


//    //실제 저장된 낚시터 이미지 가져오기
//    @GetMapping("/load-spotimage")
//    public ResponseEntity<?> loadFile(
//            @AuthenticationPrincipal TokenUserInfo userInfo,
//            @RequestParam("imagePath") String imagePath)
//    {
//        log.info("api/auth/load-spotimage GET ! - user :{}",userInfo.getUserEmail());
//        try {
//            //클라이언트가 등록한 배 사진들을 응답해야됌
//
//            //1. 배 사진의 이름을얻어야됌
////            String shipPath = shipService.findShipPath(userInfo.getUserId(), imageNumber);
//
//
//            //2. 이 얻어낸 파일 경로를 통해서 실제 파일데이터 로드하기
//            File spotImagefile = new File(imagePath);
//
//            if(!spotImagefile.exists()){
//                return ResponseEntity.notFound().build();
//            }
//
//            //해당 경로에 저장된 이미지파일을 바이트배열로 직렬화해서 리턴
//            byte[] fileData = FileCopyUtils.copyToByteArray(spotImagefile);
//
//            //3. 응답 헤더에 컨텐츠 타입을 설정
//            HttpHeaders headers = new HttpHeaders();
//            MediaType contentType = findExtensionAndGetMediaType(String.valueOf(spotImagefile));
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
//    }

    //낚시터 정보 가저오기
    //GET : /api/v1/ship/getshipinfo
    @GetMapping("/getspotinfo")
    public ResponseEntity<?> loadshipinfo(
            @AuthenticationPrincipal TokenUserInfo userInfo, BindingResult result
    ) {
        // 값 들어오는지 확인
        log.info("/ship/getshipinfo GET! --{}", userInfo);

        if (result.hasErrors()) {
            log.warn("DTO 검증 에러 발생 : {}", result.getFieldError());
            return ResponseEntity
                    .badRequest()
                    .body(result.getFieldError());
        }

        try{
            FishingSpotInfoResponseDTO shipInfo = fishingSpotService.getShipInfo(userInfo);
            return ResponseEntity.ok().body(shipInfo);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

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


    //낚시터 정보 삭제하는 함수
    @DeleteMapping("/delete")
    public ResponseEntity<?> deletespot(
            @AuthenticationPrincipal TokenUserInfo userInfo
    ){
        log.info("Spot Delete DELETE - {} ",userInfo);

        try {

            boolean result = fishingSpotService.deleteSpot(userInfo);
            if(result){
                return ResponseEntity.ok().body(result);
            }
            return ResponseEntity.badRequest().body("삭제실패!");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }


}
