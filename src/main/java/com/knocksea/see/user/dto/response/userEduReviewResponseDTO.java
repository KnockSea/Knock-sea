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
public class userEduReviewResponseDTO {

    private String reviewContent;

    private String username;

    private Long reviewId;

    private Double reviewRating;

    private LocalDateTime inquiryDateTime;

    private List<String> ImageLocations;

    public userEduReviewResponseDTO(String reviewContent, User user, Long reviewId, Double reviewRating, LocalDateTime inquiryDateTime, List<SeaImage> eduImages) {
        this.reviewContent = reviewContent;

        this.reviewId = reviewId;

        this.reviewRating = reviewRating;

        this.username = user.getUserName();

        this.ImageLocations = new ArrayList<String>();
        for (SeaImage eduImage : eduImages) {
            this.ImageLocations.add(eduImage.getImageName());
        }
    }
}
