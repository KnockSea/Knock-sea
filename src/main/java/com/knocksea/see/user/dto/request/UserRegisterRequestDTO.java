package com.knocksea.see.user.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.knocksea.see.user.entity.User;
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
public class UserRegisterRequestDTO {

    //유저 이메일
    private String UserEmail;

    //유저 비밀번호
    private String UserPassword;


    //유저 전화번호
    private String UserPhone;

    //유저 주소(간략)
    private String UserAddress;

    //유저 상세 주소
    private String UserFullAddress;

    //유저 이름
    private String userName;


//    @Nullable
//    //유저 프로필 이미지
//    private MultipartFile profileImage;

    // 엔터티로 변경하는 메서드
    public User toEntity(String uploadedFilePath) {
        return User.builder()
                .userName(this.userName)
                .userPassword(this.UserPassword)
                .userEmail(this.UserEmail)
                .profileImg(uploadedFilePath)
                .userFullAddress(this.UserFullAddress)
                .userAddress(this.UserAddress)
                .userPhone(this.UserPhone)
                .profileImg(uploadedFilePath)
                .build();
    }


}