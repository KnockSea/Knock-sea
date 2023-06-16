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
  private Inquiry inquiry;
  private User user;

  public Answer toEntity() {
    return Answer.builder()
            .answerDetails(this.answerDetails)
            .inquiry(this.inquiry)
            .user(this.user)
            .build();
  }
  public Answer toEntity(User user) {
    return Answer.builder()
        .answerDetails(this.answerDetails)
        .inquiry(this.inquiry)
        .user(user)
        .build();
  }

}