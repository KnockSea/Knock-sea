package com.knocksea.see.review.service;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.repository.EduRepository;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.repository.ProductRepository;
import com.knocksea.see.review.dto.page.PageDTO;
import com.knocksea.see.review.dto.page.PageResponseDTO;
import com.knocksea.see.review.dto.page.UserPageDTO;
import com.knocksea.see.review.dto.request.ReviewCreateDTO;
import com.knocksea.see.review.dto.response.ReviewDetailResponseDTO;
import com.knocksea.see.review.dto.response.ReviewListResponseDTO;
import com.knocksea.see.review.entity.Review;
import com.knocksea.see.review.repository.ReviewRepository;
import com.knocksea.see.user.entity.SeaImage;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.ImageRepository;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
    private final ImageRepository imageRepository;


    public ReviewDetailResponseDTO createReview(final ReviewCreateDTO reviewDTO, final TokenUserInfo userInfo) throws RuntimeException {
        User foundUser = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new RuntimeException("회원 정보가 없습니다.")
        );
        log.info("foundUser : "+foundUser);

        Product product = null;
        Edu edu = null;
//        List<String> imgUrls = new ArrayList<>();
        String imgs = null;

        if (reviewDTO.getId() != null &&reviewDTO.getReviewType().equals("SHIP")) {

            Product p = productRepository.findById(reviewDTO.getId()).get();
            List<Review> byProduct = reviewRepository.findByProduct(p);
//            log.warn("리스트 맞아?{}",byProduct.toArray());
//            if (!byProduct.isEmpty()) {
//                throw new RuntimeException("이미 리뷰 정보를 작성해서 작성할수 없습니다.");
//            }

            product = productRepository.findById(reviewDTO.getId()).orElseThrow();
            SeaImage eduImg = imageRepository.findByProduct(product);
            imgs = eduImg.getImageName();
        }

        if (reviewDTO.getId() != null &&reviewDTO.getReviewType().equals("SPOT")) {

            Product p = productRepository.findById(reviewDTO.getId()).get();
            List<Review> byProduct = reviewRepository.findByProduct(p);
//            log.warn("리스트 맞아?{}",byProduct.toArray());
//            if (!byProduct.isEmpty()) {
//
//                throw new RuntimeException("이미 리뷰 정보를 작성해서 작성할수 없습니다.");
//            }

            product = productRepository.findById(reviewDTO.getId()).orElseThrow();
            SeaImage eduImg = imageRepository.findByProduct(product);
            imgs = eduImg.getImageName();
        }

        if (reviewDTO.getId() != null&&reviewDTO.getReviewType().equals("EDU")) {
            Edu e = eduRepository.findById(reviewDTO.getId()).get();
            log.info("eeeeee : "+e);
//            log.warn("강의 정보 어딨어?: {}",e);
            List<Review> allByEdu = reviewRepository.findAllByEdu(e);
            log.info("allByEdu : "+allByEdu);

//            if (!allByEdu.isEmpty()) {
//                throw new RuntimeException("이미 리뷰 정보를 작성해서 작성할수 없습니다.");
//            }

            edu = eduRepository.findById(reviewDTO.getId()).orElseThrow();
            SeaImage eduImg = imageRepository.findAllByEdu(edu).get(0);
            imgs = eduImg.getImageName();
//            imageRepository.findAllByEdu(edu).forEach( i -> {
//                imgUrls.add(i.getImageName());
//            });
        }

        Review saved = reviewRepository.save(reviewDTO.toEntity(foundUser, edu, product));
        return new ReviewDetailResponseDTO(saved, imgs);
    }

    public ReviewListResponseDTO getUserReviewById(UserPageDTO dto, Long TokenUserId) {

        PageRequest pageable = PageRequest.of(
                dto.getPage() - 1,
                dto.getSize(),
                Sort.by("inquiryDateTime").descending()
        );
        log.info("TokenUserId - {}", TokenUserId);
        User user = userRepository.findById(TokenUserId).orElseThrow();
        Page<Review> byUserId = reviewRepository.findByUser(user, pageable);
        List<Review> userList = byUserId.getContent();
//        List<SeaImage> imgs = imageRepository.findAllByUser(user);
//        List<String> imgUrls = new ArrayList<>();
//        for (SeaImage img : imgs) {
//            imgUrls.add(img.getImageName());
//        }
        List<ReviewDetailResponseDTO> detailList = userList.stream()
                .map(review -> {
                    return new ReviewDetailResponseDTO(review, imgName(review));
                })
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
                .map(review -> {
                    String type = review.getReviewType().toString();
                    return new ReviewDetailResponseDTO(review, imgName(review));
                })
                .collect(Collectors.toList());

        return ReviewListResponseDTO.builder()
                .count(reviewList.size())
                .pageInfo(new PageResponseDTO<Review>(reviews))
                .reviews(detailList)
                .build();
    }

    public String imgName(Review review) {
        String imgs;
        if (review.getReviewType().toString().equals("SHIP") || review.getReviewType().toString().equals("SPOT")) {
            imgs = imageRepository.findByProduct(
                    productRepository.findById(review.getProduct().getProductId()).orElseThrow())
                    .getImageName();
        } else {
            imgs = imageRepository.findByEdu(
                    eduRepository.findById(review.getEdu().getEduId()).orElseThrow())
                    .getImageName();
        }
        return imgs;
    }


    public void deleteReview(Long reviewId, Long TokenUserId) throws RuntimeException, SQLException {
        Review review = reviewRepository.findById(reviewId).orElseThrow();
        if (review.getUser().getUserId().equals(TokenUserId)){
            reviewRepository.deleteById(reviewId);
        }
    }
}
