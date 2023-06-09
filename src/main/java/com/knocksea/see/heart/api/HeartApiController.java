package com.knocksea.see.heart.api;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.heart.dto.request.HeartCreateDTO;
import com.knocksea.see.heart.dto.response.HeartDetailResponseDTO;
import com.knocksea.see.heart.service.HeartService;
import com.knocksea.see.review.dto.request.ReviewCreateDTO;
import com.knocksea.see.review.dto.response.ReviewDetailResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/hearts")
public class HeartApiController {
    private final HeartService heartService;

    @PostMapping
    public ResponseEntity<?> create(
            @Validated @RequestBody HeartCreateDTO dto
            , BindingResult result
    ) {
        log.info("/api/v1/hearts ReviewCreateDTO POST!! - {}", dto);
//        log.info("userInfo - {}", userInfo);

        if (dto == null) {
            return ResponseEntity
                    .badRequest()
                    .body("후기 정보를 전달해주세요!!");
        }
        ResponseEntity<List<FieldError>> fieldErrors = getValidatedResult(result);
        if (fieldErrors != null) return fieldErrors;

        try {
//            boolean isLiked = heartService.checkIfLiked(userInfo, dto);
            boolean heart = heartService.createAndDeleteHeart(dto);

            return ResponseEntity
                    .ok()
                    .body(heart);


        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .internalServerError()
                    .body("서버 터짐 원인: " + e.getMessage());
        }
    }




    private static ResponseEntity<List<FieldError>> getValidatedResult(BindingResult result) {
        if (result.hasErrors()) { // 입력값 검증에 걸림
            List<FieldError> fieldErrors = result.getFieldErrors();
            fieldErrors.forEach(err -> {
                log.warn("invalid client data - {}", err.toString());
            });

            return ResponseEntity
                    .badRequest()
                    .body(fieldErrors);
        }
        return null;
    }

    @GetMapping("/exists")
    public ResponseEntity<?> existsByUserAndHeartType(
            @RequestParam("userId") Long userId,
            @RequestParam("heartType") String heartType
    ) {
        try {
            log.info("userId@@@@@@@@@@@@@@@@@@@@@@@ {}", userId);
            log.info("heartType@@@@@@@@@@@@@@@@@@@@ {}", heartType);
            boolean exists = heartService.existsByUserAndHeartType(userId, heartType);
            log.info("exists @@@@@@@@ {}", exists);
            return ResponseEntity.ok().body(exists);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("서버 터짐 원인: " + e.getMessage());
        }
    }

    @GetMapping("/eduHeart")
    public ResponseEntity<?> eduHeart(
            @RequestParam("eduId") Long eduId,
            @RequestParam("heartType") String heartType
    ) {
        log.info("heartType@@@@@@@@@@@@@@@@@@@@@@@@@@@ {}", heartType);
        int eduHeartCount = heartService.eduHeart(eduId, heartType);
        log.info("eduHeartCount@@@@ {}", eduHeartCount);
        return ResponseEntity.ok().body(eduHeartCount);
    }
    @GetMapping("/spotHeart")
    public ResponseEntity<?> spotHeart(
            @RequestParam("productId") Long productId,
            @RequestParam("heartType") String heartType
    ) {
        log.info("heartType@@@@@@@@@@@@@@@@@@@@@@@@@@@ {}", heartType);
        int productHeartCount = heartService.spotAndShipHeart(productId, heartType);
        log.info("eduHeartCount@@@@ {}", productHeartCount);
        return ResponseEntity.ok().body(productHeartCount);
    }
    @GetMapping("/shipHeart")
    public ResponseEntity<?> shipHeart(
            @RequestParam("productId") Long productId,
            @RequestParam("heartType") String heartType
    ) {
        log.info("heartType@@@@@@@@@@@@@@@@@@@@@@@@@@@ {}", heartType);
        int productHeartCount = heartService.spotAndShipHeart(productId, heartType);
        log.info("eduHeartCount@@@@ {}", productHeartCount);
        return ResponseEntity.ok().body(productHeartCount);
    }
}