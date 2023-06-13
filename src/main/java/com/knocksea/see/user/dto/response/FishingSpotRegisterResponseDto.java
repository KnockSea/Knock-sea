package com.knocksea.see.user.dto.response;

import com.knocksea.see.user.entity.FishingSpot;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class FishingSpotRegisterResponseDto {

    private String spotName;

    private String spotLocation;

    private String spotDescription;

    private String spotSerial;

    private int spotHeartCount;

    private String username;

    public FishingSpotRegisterResponseDto(FishingSpot save) {
        this.spotName = save.getSpotName();
        this.spotSerial = save.getSpotSerialNumber();
        this.spotLocation = save.getSpotLocation();
        this.spotDescription = save.getSpotDescription();
        this.spotHeartCount = save.getSpotHeartCount();
        this.username = save.getUser().getUserName();
    }
}
