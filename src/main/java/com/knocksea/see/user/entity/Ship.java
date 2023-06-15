package com.knocksea.see.user.entity;

import com.knocksea.see.user.dto.request.ShipModifyRequestDTO;
import lombok.*;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@Builder
@Entity
@ToString(exclude = "user")
@NoArgsConstructor
@Table(name = "sea_ship")
public class Ship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ship_id")
    private Long shipId;

    @Column(name = "ship_name", nullable = false)
    private String shipName;

    @Column(name = "ship_location", nullable = false)
    private String shipLocation;

    @Column(name = "ship_description", nullable = false, length = 2000)
    private String shipDescription;

    @Column(name = "ship_serial", nullable = false)
    private String shipSerial;

    @Column(name = "ship_like_count", nullable = false, columnDefinition = "int default 0")
    private int shipLikeCount;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    //배 수정용 함수
    public void modifyShipInfo(ShipModifyRequestDTO dto){
        this.shipSerial = dto.getShipSerial();
        this.shipDescription = dto.getShipDescription();
        this.shipLocation = dto.getShipLocation();
        this.shipName = dto.getShipName();
    }
}
