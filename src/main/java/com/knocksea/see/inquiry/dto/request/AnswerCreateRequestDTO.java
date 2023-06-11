package com.knocksea.see.inquiry.dto.request;

import com.knocksea.see.inquiry.entity.Answer;
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
public class AnswerCreateRequestDTO {

  @NotBlank
  @Size(min = 1, max = 2000)
  private String answerDetails;
  private Long userId;
  private Long inquiryId;

  public Answer toEntity() {
    return Answer.builder()
        .answerDetails(this.answerDetails)
        .userId(this.userId)
        .inquiryId(this.inquiryId)
        .build();
  }

}
