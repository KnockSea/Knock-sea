package com.knocksea.see.inquiry.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.knocksea.see.inquiry.entity.Answer;
import com.knocksea.see.inquiry.entity.Inquiry;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Slf4j
public class InquiryDetailResponseDTO {

    private Long inquiryId;
    private String inquiryDetails;

    @JsonFormat(pattern = "yyyy/MM/dd")
    private LocalDateTime inquiryDateTime;

    private Long userId;

    private String userName;

    private String inquiryTitle;
    private String answerDetails;

    public InquiryDetailResponseDTO(Inquiry inquiry) {
        this.inquiryId = inquiry.getInquiryId();
        this.inquiryDetails = inquiry.getInquiryDetails();
        this.inquiryDateTime = inquiry.getInquiryDateTime();
        this.userId = inquiry.getUser().getUserId();
        this.userName = inquiry.getUser().getUserName();
        this.inquiryTitle = inquiry.getInquiryTitle();
        Answer answer = inquiry.getAnswer();
        log.info("answer @@@ ()", answer);
        if (answer != null) {
            AnswerDetailResponseDTO dto = new AnswerDetailResponseDTO(answer, inquiry);
            this.answerDetails = dto.getAnswerDetails();
        }
    }
}

