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

    private Long inquiryId;
    private String inquiryDetails;

    @JsonFormat(pattern = "yyyy/MM/dd")
    private LocalDateTime inquiryDateTime;

    private Long userId;

    private String userName;

    private String inquiryTitle;

    public InquiryDetailResponseDTO(Inquiry inquiry) {
        this.inquiryId = inquiry.getInquiryId();
        this.inquiryDetails = inquiry.getInquiryDetails();
        this.inquiryDateTime = inquiry.getInquiryDateTime();
        this.userId = inquiry.getUser().getUserId();
        this.userName = inquiry.getUser().getUserName();
        this.inquiryTitle = inquiry.getInquiryTitle();
    }
}

