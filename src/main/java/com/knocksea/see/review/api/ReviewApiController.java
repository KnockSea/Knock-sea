package com.knocksea.see.review.api;

import com.knocksea.see.review.dto.request.ReviewCreateDTO;
import com.knocksea.see.review.dto.response.ReviewDetailResponseDTO;
import com.knocksea.see.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/reviews")
public class ReviewApiController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<?> create(
            @RequestBody ReviewCreateDTO dto
            ) {
        log.info("ReviewCreateDTO - {}", dto);
        ReviewDetailResponseDTO responseDTO = reviewService.insert(dto);

        return ResponseEntity.ok().body(responseDTO);
    }
}
