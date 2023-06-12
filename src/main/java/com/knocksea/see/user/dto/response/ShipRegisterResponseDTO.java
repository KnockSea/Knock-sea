package com.knocksea.see.user.dto.response;

import com.knocksea.see.user.entity.Ship;
import com.knocksea.see.user.entity.User;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class ShipRegisterResponseDTO {

    private String shipName;

    private String shipLocation;

    private String shipDescription;

    private String shipSerial;

    private int shipLikeCount;

    private String username;

    public ShipRegisterResponseDTO(Ship save) {
        this.shipName = save.getShipName();
        this.shipDescription = save.getShipDescription();
        this.shipLocation = save.getShipLocation();
        this.shipSerial = save.getShipSerial();
        this.shipLikeCount = save.getShipLikeCount();
        this.username = save.getUser().getUserName();
    }
}
