package com.knocksea.see.dto.response;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InquiryModifyDTO {

    @NotBlank
    @Size(min = 1, max = 200)
    private String inquiryDetails;

    @NotNull
    private int inquiryId;


}
