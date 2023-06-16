package com.knocksea.see.review.dto.request;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.review.entity.Review;
import com.knocksea.see.review.entity.ReviewType;
import com.knocksea.see.user.entity.User;
import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewCreateDTO {

    private Long reviewRating;
    private String reviewContent;
    private String reviewType;
    private User user;
    private Edu edu;
    private Product product;

    public Review toEntity() {
        return Review.builder()
                .reviewRating(this.reviewRating)
                .reviewContent(this.reviewContent)
                .reviewType(ReviewType.valueOf(this.reviewType))
                .user(this.user)
                .edu(this.edu)
                .product(this.product)
                .build();
    }

    public Review toEntity(User user) {
        return Review.builder()
            .reviewRating(this.reviewRating)
            .reviewContent(this.reviewContent)
            .reviewType(ReviewType.valueOf(this.reviewType))
            .user(user)
            .edu(this.edu)
            .product(this.product)
            .build();
    }
}
