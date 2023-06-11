package com.knocksea.see.inquiry.dto.request;


import com.knocksea.see.inquiry.entity.Inquiry;
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
public class InquiryCreateRequestDTO {

    @NotBlank
    @Size(min = 1, max = 2000)
    private String inquiryDetails;
    private int userId;

    public Inquiry toEntity() {
        return Inquiry.builder()
                .inquiryDetails(this.inquiryDetails)
                .userId(this.userId)
                .build();
    }

}
