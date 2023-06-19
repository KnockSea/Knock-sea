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

    public ReviewDetailResponseDTO(Review review) {
        this.reviewId = review.getReviewId();
        this.reviewRating = review.getReviewRating();
        this.reviewContent = review.getReviewContent();
        this.reviewType = String.valueOf(review.getReviewType());
        this.userId = review.getUser().getUserId();
        this.eduId = (long) review.getEdu().getEduId();
        this.productId = review.getProduct().getProductId();
    }

}
