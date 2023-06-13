package com.knocksea.see.auth;

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

    private String userGrade;

}
