package com.knocksea.see.user.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDeleteRequest {

    @NotBlank
    private String userEmail;

    @NotBlank
    private String userPassword;
}
