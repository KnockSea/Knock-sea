package com.knocksea.see.user.dto.request;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class LoginRequestDTO {
    @NotBlank
    @Email
    private String userEmail;

    @NotBlank
    private String userPassword;
}
