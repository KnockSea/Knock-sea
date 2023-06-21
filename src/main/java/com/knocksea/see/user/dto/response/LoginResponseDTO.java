package com.knocksea.see.user.dto.response;

import com.knocksea.see.user.entity.User;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class LoginResponseDTO {

    private Long userId;

    private String userEmail;

    private String userName;

    private String userGrade;

    private String token; //인증토큰


    public LoginResponseDTO(User user, String token) {
        this.userEmail = user.getUserEmail();
        this.userName = user.getUserName();
        this.userGrade = user.getUserGrade().toString();
        this.token = token;
        this.userId = user.getUserId();
    }
}
