package com.knocksea.see.user.dto.request;


import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FishingSpotRegisterRequestDTO {

    @NotBlank
    private String spotName;

    @NotBlank
    @Size(max = 2000)
    private String spotDescription;

}
