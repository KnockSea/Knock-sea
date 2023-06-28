package com.knocksea.see.review.dto.response;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.review.entity.Review;
import com.knocksea.see.review.entity.ReviewType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDetailResponseDTO {

    private Long reviewId;
    private Double reviewRating;
    private String reviewContent;
    private ReviewType reviewType;
    private Long userId;
    private Long eduId;
    private Long productId;
    private String profileImg;
    private String productTitle;
    private String eduTitle;
    private String userName;
    private String title;
    private LocalDateTime inquiryDateTime;
    private String image;

    public ReviewDetailResponseDTO(Review review, String imgUrls) {
        this.reviewId = review.getReviewId();
        this.reviewRating = review.getReviewRating();
        this.reviewContent = review.getReviewContent();
        this.reviewType = review.getReviewType();
        this.userId = review.getUser().getUserId();
        this.eduId = review.getEdu() != null ? review.getEdu().getEduId() : null;
        this.productId = review.getProduct() != null ? review.getProduct().getProductId() : null;
        this.profileImg = review.getUser().getProfileImg();
        this.productTitle = review.getProduct() != null ? review.getProduct().getProductTitle() : null;
        this.eduTitle = review.getEdu() != null ? review.getEdu().getEduTitle() : null;
        this.title = review.getEdu().getEduTitle() != null ? review.getEdu().getEduTitle() : review.getProduct().getProductTitle();
        this.userName = review.getUser().getUserName();
//        this.image = review.getEdu().getSeaImage().getImageName() != null ? review.getEdu().getSeaImage().getImageName() : review.getProduct().getSeaImage().getImageName();
        this.image = imgUrls;
    }

//    public <T> String findImgUrl(T obj) {
//        if (obj instanceof Product) {
//            this.image = obj
//        }
//    }

}
