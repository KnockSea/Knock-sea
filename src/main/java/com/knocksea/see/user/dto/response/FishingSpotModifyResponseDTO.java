package com.knocksea.see.user.dto.response;


import com.knocksea.see.user.entity.FishingSpot;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
@Setter
@Getter
public class FishingSpotModifyResponseDTO {

    private String spotName;

    private String spotLocation;

    private String spotDescription;

    private String spotSerialNumber;

    private List<String> saveImageLocation;


    public FishingSpotModifyResponseDTO(FishingSpot save) {

        this.spotName = save.getSpotName();
        this.spotDescription = save.getSpotDescription();
        this.spotLocation = save.getSpotLocation();
        this.spotSerialNumber = save.getSpotSerialNumber();
    }
}
