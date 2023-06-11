package com.knocksea.see.user.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserModifyRequestDTO {

    //유저 이메일
    @NotBlank
    @Email
    private String userEmail;


    //유저 전화번호
    @NotBlank
    private String userPhone;

    //유저 주소(간략)
    @NotBlank
    private String userAddress;

    //유저 상세 주소
    @NotBlank
    private String userFullAddress;

    //유저 이름
    @NotBlank
    private String username;
}
