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
public class userShipProductReviewResponseDTO {

    private String username;

    private Long reviewId;

    private double reviewRating;

    private LocalDateTime inquiryDatetime;

    private String reviewContent;

    private List<String> ImageLocations;

    public userShipProductReviewResponseDTO(String reviewContent, User user, Long reviewId, Double reviewRating, LocalDateTime inquiryDateTime, List<SeaImage> shipImages) {

        this.username = user.getUserName();

        this.reviewId = reviewId;

        this.reviewRating = reviewRating;

        this.inquiryDatetime = inquiryDateTime;

        this.reviewContent = reviewContent;

        this.ImageLocations = new ArrayList<String>();
        for (SeaImage shipImage : shipImages) {
            this.ImageLocations.add(shipImage.getImageName());
        }
    }
}
