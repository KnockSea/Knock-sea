package com.knocksea.see.inquiry.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.knocksea.see.inquiry.entity.Answer;
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


    public AnswerDetailResponseDTO(Answer answer) {
        this.answerId = answer.getAnswerId();
        this.answerDetails = answer.getAnswerDetails();
        this.answerDateTime = answer.getAnswerDateTime();
    }
}
