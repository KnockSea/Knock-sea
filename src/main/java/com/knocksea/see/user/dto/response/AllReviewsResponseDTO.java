package com.knocksea.see.user.dto.response;


import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Setter
@Getter
@Builder
public class AllReviewsResponseDTO {

    private List<userShipProductReviewResponseDTO> userShipProductReviewResponseDTO;

    private List<userSpotProductReviewResponseDTO> userSpotProductReviewResponseDTO;

    private List<userEduReviewResponseDTO> userEduReviewResponseDTO;

}
