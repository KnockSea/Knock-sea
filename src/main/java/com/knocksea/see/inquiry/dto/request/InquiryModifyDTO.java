package com.knocksea.see.inquiry.dto.request;

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
    @Size(min = 1, max = 2000)
    private String inquiryDetails;

    @NotNull
    private Long inquiryId;



}
