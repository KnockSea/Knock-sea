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
public class FishingModifyRequestDTO {

    //선착장 이름
    @NotBlank
    private String spotTitle;

//    //선착장 위치
//    @NotBlank
//    private String spotLocation;

    //선박 상세 설명 최소 50자 최대 2000자
    @NotBlank
    @Size(min = 50, max = 2000)
    private String spotDescription;

//    //배번호
//    @NotBlank
//    private String spotSerialNumber;

}
