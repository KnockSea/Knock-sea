package com.knocksea.see.inquiry.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.knocksea.see.inquiry.entity.Answer;
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
public class AnswerDetailResponseDTO {

    private Long answerId;
    private String answerDetails;

    @JsonFormat(pattern = "yyyy/MM/dd")
    private LocalDateTime answerDateTime;

    private Long userId;
    private Long inquiryId;
    private String userName;
    private String inquiryTitle;
    private String inquiryDetails;

    public  AnswerDetailResponseDTO(Answer answer, Inquiry inquiry) {
        this.answerId = answer.getAnswerId();
        this.answerDetails = answer.getAnswerDetails();
        this.answerDateTime = answer.getAnswerDateTime();
        this.userId = answer.getUser().getUserId();
        this.inquiryId = answer.getInquiry().getInquiryId();
        this.userName = answer.getUser().getUserName();
        this.inquiryTitle = inquiry.getInquiryTitle();
        this.inquiryDetails = inquiry.getInquiryDetails();
    }
}