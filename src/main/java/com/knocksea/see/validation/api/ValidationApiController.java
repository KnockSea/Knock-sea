package com.knocksea.see.validation.api;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.edu.dto.request.EduAndReservationTimeCreateDTO;
import com.knocksea.see.edu.dto.response.EduDetailResponseDTO;
import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.validation.dto.ValidationCreateDTO;
import com.knocksea.see.validation.service.ValidationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/validation")
public class ValidationApiController {

    @Autowired
    ValidationService validationService;

    @PostMapping
    public ResponseEntity<?> create(
/*            private MultipartFile validationShipRegiImg; //선박 등록증 이미지

    private MultipartFile validationShipLicenseImg; //선박 면허증 이미지
    private MultipartFile validationBusinessRegiImg; //사업자 등록증 이미지*/
            @Validated @RequestPart("validation") ValidationCreateDTO dto,
            @RequestPart(value = "validationImage", required = false) List<MultipartFile> validationImg
            , @AuthenticationPrincipal TokenUserInfo userInfo
            , BindingResult result
    ) {
        log.info("/api/v1/validation POST!!: --{}", dto);

        if (dto == null) {
            return ResponseEntity
                    .badRequest()
                    .body("검증 정보가 없습니다. 검증 정보를 전달해주세요!" + result.getFieldError());
        }

        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity
                    .badRequest()
                    .body(result.getFieldError());
        }

        try {

            validationService.insert(dto,userInfo);


            /*return ResponseEntity.ok().body();*/

        } catch (NoRegisteredArgumentsException e) {
            log.warn("필수 등록 정보를 받지 못했습니다.");
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            log.warn("기타 예외가 발생했습니다.");
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }

        return null;

    }
}
