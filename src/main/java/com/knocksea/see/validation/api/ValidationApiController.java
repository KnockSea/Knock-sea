package com.knocksea.see.validation.api;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.edu.dto.request.EduAndReservationTimeCreateDTO;
import com.knocksea.see.edu.dto.response.EduDetailResponseDTO;
import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.user.service.ImageService;
import com.knocksea.see.validation.dto.request.ValidationCreateDTO;
import com.knocksea.see.validation.dto.request.validationModifyRequestDTO;
import com.knocksea.see.validation.dto.response.ValidationListResponseDTO;
import com.knocksea.see.validation.dto.response.ValidationRegisterResponseDTO;
import com.knocksea.see.validation.entity.Validation;
import com.knocksea.see.validation.entity.ValidationStatus;
import com.knocksea.see.validation.entity.ValidationType;
import com.knocksea.see.validation.service.ValidationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/validation")
public class ValidationApiController {


    private final ValidationService validationService;
    private final ImageService imageService;

    /*  private MultipartFile validationShipRegiImg; //선박 등록증 이미지
        private MultipartFile validationShipLicenseImg; //선박 면허증 이미지
        private MultipartFile validationBusinessRegiImg; //사업자 등록증 이미지*/
    @PostMapping("/insert")
    public ResponseEntity<?> create(

            @Validated @RequestPart("validation") ValidationCreateDTO dto,
            @RequestPart(value = "validationImage", required = false) List<MultipartFile> validationImg
            ,@AuthenticationPrincipal TokenUserInfo userInfo
            ,BindingResult result
    ) {
        log.info("/api/v1/validation POST!!: --{}", userInfo);

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
            ValidationRegisterResponseDTO insertValidation = validationService.insert(dto, userInfo);//토큰 사용시
//            ValidationRegisterResponseDTO insertValidation = validationService.insert(dto);
            log.info("insertValidation : "+insertValidation);

            if(validationImg!=null){
                log.info("ggggg");
                //이미지 파일들이 잘 들어왔다면 원본이름 출력시키기
                for (MultipartFile validationImage : validationImg) {
                    log.info("validationImage : {}"+validationImage.getOriginalFilename());
                }
                //이미지 저장시키기
                imageService.saveValidationImg(validationImg,dto,userInfo);
            }

            return ResponseEntity.ok().body(insertValidation);

        } catch (NoRegisteredArgumentsException e) {
            log.warn(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            log.warn("기타 예외가 발생했습니다.");
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }

    }

    //타입별 전체조회
    @GetMapping("/{validationType}")
    public ResponseEntity<?> list(@PathVariable ValidationType validationType/*, @PathVariable Long userId*/){
        log.info("/api/v1/validation {} GET",validationType);

        List<ValidationListResponseDTO> allByType = validationService.findAllByType(validationType);
        return ResponseEntity.ok().body(allByType);
    }

    //검증 상태 변경
    @RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH})
    public ResponseEntity<?> update(
            @Validated @RequestBody validationModifyRequestDTO dto
            , BindingResult result
            , HttpServletRequest request
    ){
        String userName= dto.getUserName();
        ValidationStatus validationStatus=dto.getValidationStatus();
        ValidationType validationType=dto.getValidationType();

        log.info("검증 상태 수정 : "+ userName +" "+ validationStatus+" "+validationType);
        try {
            ValidationStatus latestvalidationStatus
                    = validationService.modifyStatus(dto);
            return ResponseEntity.ok().body(latestvalidationStatus);
        }
        catch (Exception e){
            return ResponseEntity
                    .internalServerError()
                    .body(e.getMessage());
        }
    }
}
