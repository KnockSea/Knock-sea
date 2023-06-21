package com.knocksea.see.user.dto.request;


import lombok.*;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FishingSpotRegisterRequestDTO {

    private String spotName;


    private String spotDescription;

}
