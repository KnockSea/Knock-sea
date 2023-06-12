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

    private String email;
    private String userName;

    private String userGrade;

    private String token; //인증토큰


    public LoginResponseDTO(User user, String token) {
        this.email = user.getUserEmail();
        this.userName = user.getUserName();
        this.userGrade = user.getUserGrade();
        this.token = token;
    }
}
