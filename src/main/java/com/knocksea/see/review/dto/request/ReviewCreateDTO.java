package com.knocksea.see.review.dto.request;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.review.entity.Review;
import com.knocksea.see.review.entity.ReviewType;
import com.knocksea.see.user.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewCreateDTO {
    private Double reviewRating; // 5L
    private String reviewContent; // "이거 재밌어여"
    private String reviewType; // 타입
    // 작성자 정보
    private Long id;
//    private Long productId;

    public Review toEntity(User user, Edu edu, Product product) {
        return Review.builder()
                .reviewRating(this.reviewRating)
                .reviewContent(this.reviewContent)
                .reviewType(ReviewType.valueOf(this.reviewType))
                .user(user)
                .edu(edu)
                .product(product)
                .build();
    }

}
