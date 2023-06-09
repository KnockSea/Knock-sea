package com.knocksea.see.dto.response;

import com.knocksea.see.entity.Ship;
import com.knocksea.see.entity.User;
import lombok.*;

import java.time.LocalDate;
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

    private Ship ship;

    public UserModifyresponseDTO(User modiftideuser) {
        this.ship = modiftideuser.getShip();
        this.userPoint = modiftideuser.getUserPoint();
        this.userAddress = modiftideuser.getUserAddress();
        this.userFullAddress = modiftideuser.getUserFullAddress();
        this.userGrade = modiftideuser.getUserGrade();
        this.userEmail = modiftideuser.getUserEmail();
        this.userName = modiftideuser.getUserName();
        this.userPhone = modiftideuser.getUserPhone();

    }
}
