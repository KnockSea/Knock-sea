package com.knocksea.see.user.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipRegisterRequestDTO {

    //배 이름
    @NotBlank
    private String shipName;

    @NotBlank
    @Size(max = 2000)
    private String shipDescription;



}