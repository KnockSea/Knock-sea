package com.knocksea.see.review.api;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.review.dto.page.PageDTO;
import com.knocksea.see.review.dto.request.ReviewCreateDTO;
import com.knocksea.see.review.dto.response.ReviewDetailResponseDTO;
import com.knocksea.see.review.dto.response.ReviewListResponseDTO;
import com.knocksea.see.review.entity.Review;
import com.knocksea.see.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
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
@RequestMapping("/api/v1/reviews")
public class ReviewApiController {

        private final ReviewService reviewService;

        // 리뷰 후기 등록
        @PostMapping
        public ResponseEntity<?> create(
            @AuthenticationPrincipal TokenUserInfo userInfo,
            @Validated @RequestBody ReviewCreateDTO dto
            , BindingResult result
        ) {
          log.info("/api/v1/reviews ReviewCreateDTO POST!! - {}", dto);

          if (dto == null) {
            return ResponseEntity
                .badRequest()
                .body("후기 정보를 전달해주세요!!");
          }
          ResponseEntity<List<FieldError>> fieldErrors = getValidatedResult(result);
          if (fieldErrors != null) return fieldErrors;

          try {
            ReviewDetailResponseDTO responseDTO = reviewService.createReview(dto, userInfo);
            return ResponseEntity
                .ok()
                .body(responseDTO);
          } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity
                .internalServerError()
                .body("서버 터짐 원인: " + e.getMessage());
          }
        }

        // 자신이 쓴 후기
        @GetMapping("/myReview")
        public ResponseEntity<?> getReviewById(
            @AuthenticationPrincipal TokenUserInfo userInfo
            , PageDTO pageDTO) {
          ReviewListResponseDTO userReviewById = reviewService.getUserReviewById(pageDTO, userInfo.getUserId());
          try {
            return ResponseEntity.ok().body(userReviewById);
          } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
          }
        }

        // 후기 전체 리스트
  @GetMapping
  public ResponseEntity<?> list(PageDTO pageDTO) {
    log.info("/api/v1/reviews?page={}&size={}", pageDTO.getPage(), pageDTO.getSize());

    ReviewListResponseDTO dto = reviewService.getAllReviews(pageDTO);

    log.info("dto - {}", dto);

    return ResponseEntity.ok().body(dto);
  }

        // 다른 경로와 관련된 후기 조회 API들을 추가할 수 있습니다.

  // 삭제 기능
  @DeleteMapping("/{reviewId}")
  public ResponseEntity<?> delete(
      @AuthenticationPrincipal TokenUserInfo userInfo,
      @PathVariable Long reviewId
  ) {
    log.info("/api/v1/reviews/{}  DELETE!! ", reviewId);

    try {
      reviewService.deleteReview(reviewId, userInfo.getUserId());
      return ResponseEntity
          .ok("DEL SUCCESS!!");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity
          .internalServerError()
          .body(e.getMessage());
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
    }

