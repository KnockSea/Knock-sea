package com.knocksea.see.inquiry.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.knocksea.see.inquiry.entity.Inquiry;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InquiryDetailResponseDTO {

    private int inquiryId;
    private String inquiryDetails;

    @JsonFormat(pattern = "yyyy/MM/dd")
    private LocalDateTime inquiryDateTime;

    private int userId;
    public InquiryDetailResponseDTO(Inquiry inquiry) {
        this.inquiryId = inquiry.getInquiryId();
        this.inquiryDetails = inquiry.getInquiryDetails();
        this.inquiryDateTime = inquiry.getInquiryDateTime();
        this.userId = inquiry.getUserId();
    }
}

