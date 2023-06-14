package com.knocksea.see.review.dto.response;

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

    public ReviewDetailResponseDTO(Review review) {
        this.reviewId = review.getReviewId();
        this.reviewRating = review.getReviewRating();
        this.reviewContent = review.getReviewContent();
        if (review.getEdu() != null) {
            this.reviewType = "CLASS";
        } else if (review.getProduct() != null) {
            this.reviewType = "FISHING";
        } else {
            this.reviewType = String.valueOf(review.getReviewType());
        }
        this.userId = review.getUser().getUserId();
        Long eduId = review.getEdu() != null ? (long) review.getEdu().getEduId() : null;
        this.eduId = eduId;
        Long productId = review.getProduct() != null ? review.getProduct().getProductId() : null;
        this.productId = productId;
    }

}
