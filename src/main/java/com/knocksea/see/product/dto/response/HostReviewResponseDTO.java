package com.knocksea.see.product.dto.response;

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
public class HostReviewResponseDTO {

    private Long reviewId;
    private Double reviewRating;
    private String reviewContent;
    private ReviewType reviewType;
    private String userName;
    private String image;


    public HostReviewResponseDTO(Review r) {

    }
}
