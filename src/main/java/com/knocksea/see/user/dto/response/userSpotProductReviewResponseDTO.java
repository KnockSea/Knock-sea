package com.knocksea.see.user.dto.response;


import com.knocksea.see.user.entity.SeaImage;
import com.knocksea.see.user.entity.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Setter
@Getter
@Builder
public class userSpotProductReviewResponseDTO {

    private String username;

    private String reviewContent;

    private Long reviewId;

    private Double reviewRating;

    private LocalDateTime inquiryDateTime;

    private List<String> ImageLocations;

    public userSpotProductReviewResponseDTO(String reviewContent, User user, Long reviewId, Double reviewRating, LocalDateTime inquiryDateTime, List<SeaImage> spotImages) {

        this.username = user.getUserName();

        this.reviewContent = reviewContent;

        this.reviewId = reviewId;

        this.reviewRating = reviewRating;

        this.inquiryDateTime = inquiryDateTime;

        this.ImageLocations = new ArrayList<String>();
        for (SeaImage spot : spotImages) {
            this.ImageLocations.add(spot.getImageName());
        }
    }


}
