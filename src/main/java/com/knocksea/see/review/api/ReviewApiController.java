package com.knocksea.see.review.api;

import com.knocksea.see.inquiry.dto.request.InquiryCreateRequestDTO;
import com.knocksea.see.inquiry.dto.response.InquiryDetailResponseDTO;
import com.knocksea.see.inquiry.dto.response.InquiryListResponseDTO;
import com.knocksea.see.review.dto.page.PageDTO;
import com.knocksea.see.review.dto.request.ReviewCreateDTO;
import com.knocksea.see.review.dto.request.ReviewDTO;
import com.knocksea.see.review.dto.response.ReviewDetailResponseDTO;
import com.knocksea.see.review.dto.response.ReviewListResponseDTO;
import com.knocksea.see.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

        @PostMapping
        public ResponseEntity<?> create(
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
            ReviewDetailResponseDTO responseDTO = reviewService.createReview(dto);
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

        @GetMapping("/{reviewId}")
        public ResponseEntity<?> getReviewById(@PathVariable Long reviewId) {
          ReviewDetailResponseDTO dto = reviewService.getReviewById(reviewId);
          try {
            return ResponseEntity.ok().body(dto);
          } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
          }
        }

  @GetMapping
  public ResponseEntity<?> list(PageDTO pageDTO) {
    log.info("/api/v1/reviews?page={}&size={}", pageDTO.getPage(), pageDTO.getSize());

    ReviewListResponseDTO dto = reviewService.getAllReviews(pageDTO);

    log.info("dto - {}", dto);

    return ResponseEntity.ok().body(dto);
  }

        // 다른 경로와 관련된 후기 조회 API들을 추가할 수 있습니다.

  @DeleteMapping("/{reviewId}")
  public ResponseEntity<?> delete(
      @PathVariable Long reviewId
  ) {
    log.info("/api/v1/reviews/{}  DELETE!! ", reviewId);

    try {
      reviewService.deleteReview(reviewId);
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

