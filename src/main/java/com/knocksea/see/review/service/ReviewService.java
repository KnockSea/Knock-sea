package com.knocksea.see.review.service;

import com.knocksea.see.review.dto.page.PageDTO;
import com.knocksea.see.review.dto.page.PageResponseDTO;
import com.knocksea.see.review.dto.request.ReviewCreateDTO;
import com.knocksea.see.review.dto.response.ReviewDetailResponseDTO;
import com.knocksea.see.review.dto.response.ReviewListResponseDTO;
import com.knocksea.see.review.entity.Review;
import com.knocksea.see.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ReviewService {
  private final ReviewRepository reviewRepository;



  public ReviewDetailResponseDTO createReview(ReviewCreateDTO reviewDTO) throws  RuntimeException{
    Review saved = reviewRepository.save(reviewDTO.toEntity());
    return new ReviewDetailResponseDTO(saved);
  }

  public ReviewListResponseDTO getUserReviewById(Long userId, PageDTO dto) {

    PageRequest pageable = PageRequest.of(
            dto.getPage() - 1,
            dto.getSize(),
            Sort.by("inquiryDateTime").descending()
    );
    Page<Review> byUserId = reviewRepository.findByUserId(userId, pageable);
    List<Review> reviewList = byUserId.getContent();
    List<ReviewDetailResponseDTO> detailList = reviewList.stream()
            .map(ReviewDetailResponseDTO::new)
            .collect(Collectors.toList());



    return ReviewListResponseDTO.builder()
            .count(reviewList.size())
            .pageInfo(new PageResponseDTO<Review>(byUserId))
            .reviews(detailList)
            .build();
  }

  public ReviewListResponseDTO getAllReviews(PageDTO dto) {

    PageRequest pageable = PageRequest.of(
        dto.getPage() - 1,
        dto.getSize(),
        Sort.by("inquiryDateTime").descending()
    );

    Page<Review> reviews = reviewRepository.findAll(pageable);
    List<Review> reviewList = reviews.getContent();
    List<ReviewDetailResponseDTO> detailList = reviewList.stream()
        .map(ReviewDetailResponseDTO::new)
        .collect(Collectors.toList());

    return ReviewListResponseDTO.builder()
        .count(reviewList.size())
        .pageInfo(new PageResponseDTO<Review>(reviews))
        .reviews(detailList)
        .build();
  }

  public void deleteReview(Long userId) throws RuntimeException, SQLException {

    reviewRepository.deleteById(userId);
  }
}
