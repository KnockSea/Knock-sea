package com.knocksea.see.review.service;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.repository.EduRepository;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.repository.ProductRepository;
import com.knocksea.see.review.dto.page.PageDTO;
import com.knocksea.see.review.dto.page.PageResponseDTO;
import com.knocksea.see.review.dto.request.ReviewCreateDTO;
import com.knocksea.see.review.dto.response.ReviewDetailResponseDTO;
import com.knocksea.see.review.dto.response.ReviewListResponseDTO;
import com.knocksea.see.review.entity.Review;
import com.knocksea.see.review.repository.ReviewRepository;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
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
    private final UserRepository userRepository;

    private final EduRepository eduRepository;
    private final ProductRepository productRepository;


    public ReviewDetailResponseDTO createReview(final ReviewCreateDTO reviewDTO, final TokenUserInfo userInfo) throws RuntimeException {
        User foundUser = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new RuntimeException("회원 정보가 없습니다.")
        );
        Product product = null;
        Edu edu = null;

        if (reviewDTO.getProductId() != null) {
            product = productRepository.findById(reviewDTO.getProductId()).orElseThrow();
        }

        if (reviewDTO.getEduId() != null) {
            edu = eduRepository.findById(reviewDTO.getEduId()).orElseThrow();
        }

        Review saved = reviewRepository.save(reviewDTO.toEntity(foundUser, edu, product));
        return new ReviewDetailResponseDTO(saved);
    }

    public ReviewListResponseDTO getUserReviewById(PageDTO dto, Long TokenUserId) {

        PageRequest pageable = PageRequest.of(
                dto.getPage() - 1,
                dto.getSize(),
                Sort.by("inquiryDateTime").descending()
        );
        log.info("TokenUserId - {}", TokenUserId);
        User user = userRepository.findById(TokenUserId).orElseThrow();
        Page<Review> byUserId = reviewRepository.findByUser(user, pageable);
        List<Review> userList = byUserId.getContent();
        List<ReviewDetailResponseDTO> detailList = userList.stream()
                .map(ReviewDetailResponseDTO::new)
                .collect(Collectors.toList());

        log.info("byUserId - {}", byUserId);
        log.info("detailList - {}", detailList);

        return ReviewListResponseDTO.builder()
                .count(userList.size())
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

    public void deleteReview(Long reviewId, Long TokenUserId) throws RuntimeException, SQLException {
        Review review = reviewRepository.findById(reviewId).orElseThrow();
        if (review.getUser().getUserId().equals(TokenUserId)){
            reviewRepository.deleteById(reviewId);
        }
    }
}
