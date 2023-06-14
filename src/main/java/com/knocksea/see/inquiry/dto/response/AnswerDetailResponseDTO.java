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

    public  AnswerDetailResponseDTO(Answer answer) {
        this.answerId = answer.getAnswerId();
        this.answerDetails = answer.getAnswerDetails();
        this.answerDateTime = answer.getAnswerDateTime();
        this.userId = answer.getUser().getUserId();
        this.inquiryId = answer.getInquiry().getInquiryId();
    }
}