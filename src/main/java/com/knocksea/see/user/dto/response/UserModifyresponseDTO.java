package com.knocksea.see.user.dto.response;

import com.knocksea.see.user.entity.Ship;
import com.knocksea.see.user.entity.User;
import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserModifyresponseDTO {

    private String userEmail;

    private String userName;

    private String userPhone;

    private String userAddress;

    private String userFullAddress;

    private String userGrade;


    private int userPoint;


    public UserModifyresponseDTO(User modiftideuser) {
        this.userPoint = modiftideuser.getUserPoint();
        this.userAddress = modiftideuser.getUserAddress();
        this.userFullAddress = modiftideuser.getUserFullAddress();
        this.userGrade = modiftideuser.getUserGrade();
        this.userEmail = modiftideuser.getUserEmail();
        this.userName = modiftideuser.getUserName();
        this.userPhone = modiftideuser.getUserPhone();
    }
}
