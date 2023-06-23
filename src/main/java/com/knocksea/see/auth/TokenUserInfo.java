package com.knocksea.see.auth;

import com.knocksea.see.user.entity.UserGrade;
import lombok.*;

@Getter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TokenUserInfo {

    private Long userId;

    private String userEmail;

    private UserGrade userGrade;

    private String userPhone;

    private String userName;

}
