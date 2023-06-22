package com.knocksea.see.review.dto.response;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.review.entity.Review;
import com.knocksea.see.review.entity.ReviewType;
import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDetailResponseDTO {

    private Long reviewId;
    private Long reviewRating;
    private String reviewContent;
    private String reviewType;
    private Long userId;
    private Long eduId;
    private Long productId;
    private String profileImg;
    private String productTitle;
    private String eduTitle;
    private String userName;
    private String title;


    public ReviewDetailResponseDTO(Review review) {
        this.reviewId = review.getReviewId();
        this.reviewRating = review.getReviewRating();
        this.reviewContent = review.getReviewContent();
        this.reviewType = String.valueOf(review.getReviewType());
        this.userId = review.getUser().getUserId();
        this.eduId = review.getEdu() != null ? review.getEdu().getEduId() : null;
        this.productId = review.getProduct() != null ? review.getProduct().getProductId() : null;
        this.profileImg = review.getUser().getProfileImg();
        this.productTitle = review.getProduct() != null ? review.getProduct().getProductTitle() : null;
        this.eduTitle = review.getEdu() != null ? review.getEdu().getEduTitle() : null;
        this.title = review.getEdu().getEduTitle() != null ? review.getEdu().getEduTitle() : review.getProduct().getProductTitle();
        this.userName = review.getUser().getUserName();
    }

}
