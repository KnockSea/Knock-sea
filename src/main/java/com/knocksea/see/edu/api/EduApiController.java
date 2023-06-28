package com.knocksea.see.edu.api;

import antlr.Token;
import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.edu.dto.response.*;
import com.knocksea.see.edu.dto.request.EduAndReservationTimeCreateDTO;
import com.knocksea.see.edu.service.EduService;
import com.knocksea.see.inquiry.dto.page.PageDTO;
import com.knocksea.see.user.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/edu")
public class EduApiController {


    private final EduService eduService;
    private final ImageService imageService;

    //좋아요 많은 순 4개 조회
    @GetMapping("/topFour")
    public ResponseEntity<?> topFourList() {
        log.info("/api/v1/edu topFourList");

        EduTopFourListResponseDTO topFourDto = eduService.findTopFour();

        return ResponseEntity
                .ok()
                .body(topFourDto);
    }

    //전체 조회
    @GetMapping
    public ResponseEntity<?> list(PageDTO pageDTO) {
        log.info("/api/v1/posts?page={}&size={}", pageDTO.getPage(), pageDTO.getSize());

        EduListResponseDTO allEdu = eduService.getAllEdu(pageDTO);
        log.info("Page DTO : {}",pageDTO);
//        log.warn("이거 아닌거같은데? {}", allEdu);
        return ResponseEntity
                .ok()
                .body(allEdu);
    }

    //개별 조회
    @GetMapping("/{eduId}")
    public ResponseEntity<?> detail(@PathVariable Long eduId) {
        log.info("/api/v1/edu/{} GET", eduId);

        try {
            EduDetailResponseDTO dto = eduService.getDetail(eduId);

            return ResponseEntity.ok().body(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    //클래스 등록 - post
    @PostMapping
    public ResponseEntity<?> create(
            @Validated @RequestPart(value = "Edu") EduAndReservationTimeCreateDTO dto
            , @AuthenticationPrincipal TokenUserInfo userInfo
            , @RequestPart(value = "EduImage", required = false) List<MultipartFile> EduImg
            , BindingResult result
    ) {
        log.info("/api/v1/edu POST!! - payload: {}", dto);
//        log.info("Token : "+userInfo);

        if (dto == null) {
            return ResponseEntity
                    .badRequest()
                    .body("클래스 정보가 없습니다. 클래스 정보를 전달해주세요");
        }

        //입력값 검증
        ResponseEntity<List<FieldError>> fieldErros = getValidatedResult(result);
        if (fieldErros != null) return fieldErros;

        try {

            EduDetailResponseDTO responseDTO = eduService.insert(dto,userInfo);

            if (EduImg != null) {
                //이미지 파일들이 잘 들어왔다면 원본이름 출력시키기
                for (MultipartFile validationImage : EduImg) {
                    log.info("validationImage : " + validationImage.getOriginalFilename());
                }
                //이미지 저장시키기
                imageService.saveEduImg(EduImg, userInfo);
            }

            return ResponseEntity
                    .ok()
                    .body(responseDTO + " 저장 성공");
        } catch (RuntimeException e) {
//            e.printStackTrace();
            return ResponseEntity
                    .internalServerError()
                    .body("서버 터짐: " + e.getMessage());
        } catch (Exception e) {
            log.warn("기타 예외가 발생했습니다.");
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //입력값 검증
    private static ResponseEntity<List<FieldError>> getValidatedResult(BindingResult result) {
        if (result.hasErrors()) {
            List<FieldError> fieldErrors = result.getFieldErrors();
            fieldErrors.forEach(err -> {
                log.warn("입력값 검증에 걸림. 클라이언트 데이터 유효하지 않음 - {}", err.toString());
            });

            return ResponseEntity
                    .badRequest()
                    .body(fieldErrors);
        }
        return null;
    }

    //클래스 수정
    @RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH})
    public ResponseEntity<?> update(
            @Validated @RequestPart(value = "Edu") EduAndReservationTimeCreateDTO dto
            , @RequestPart(value = "EduImage", required = false) List<MultipartFile> EduImg
            , @AuthenticationPrincipal TokenUserInfo userInfo
            , HttpServletRequest request
    ) {
        log.info("클래스 수정");
        log.info("/api/v1/edu {}!! - dto: {}", request.getMethod(), dto);

        try {
            EduDetailResponseDTO responseDTO
                    = eduService.modify(dto,userInfo,EduImg);
            return ResponseEntity.ok().body(responseDTO);
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(e.getMessage());
        }
    }

    //게시물 삭제
    @DeleteMapping("/{eduId}")
    public ResponseEntity<?> delete(@PathVariable Long eduId) {
        log.info("/api/v1/posts DELETE!! ");

        try {
            eduService.delete(eduId);
            return ResponseEntity
                    .ok("DEL SUCCESS!!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .internalServerError()
                    .body(e.getMessage());
        }
    }

    @GetMapping("/main/edu")
    public ResponseEntity<?> mainPageSpot() {

//        log.info("/api/v1/products GET ! - {} ", );

        return ResponseEntity.ok().body(eduService.eduMainList());
    }


    //내가 등록한 클래스 간략정보 가져오기
    @GetMapping("/my-edu")
    public ResponseEntity<?> myEduList(
            @AuthenticationPrincipal TokenUserInfo userInfo
    ) {
        log.info("my-edu - GET !!{}",userInfo);
        try {
            ResponseMyEduDTO myEdu = eduService.getMyEdu(userInfo);
            return ResponseEntity.ok().body(myEdu);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
