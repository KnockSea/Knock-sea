package com.knocksea.see.inquiry.dto.request;

import com.knocksea.see.inquiry.entity.Answer;
import com.knocksea.see.inquiry.entity.Inquiry;
import com.knocksea.see.user.entity.User;
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
  private Long inquiryId;


  public Answer toEntity(User user, Inquiry inquiry) {
    return Answer.builder()
        .answerDetails(this.answerDetails)
        .inquiry(inquiry)
        .user(user)
        .build();
  }

}