package com.knocksea.see.user.dto.response;

import com.knocksea.see.user.entity.Ship;
import lombok.*;

import java.util.List;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipModifyResponseDTO {


    //수정된배 이름
    private String shipName;

    //수정된 선착장 위치
    private String shipLocation;

    //선박 상세 설명 최소 50자 최대 2000자
    private String shipDescription;

    //배번호
    private String shipSerial;


    //새로 저장된 선박 이미지 저장경로
    private List<String> shipImageSaveLocation;

    public ShipModifyResponseDTO(Ship save, List<String> modifyShipImagesSaveLocation) {
        this.shipName = save.getShipName();
        this.shipSerial = save.getShipSerial();
        this.shipDescription = save.getShipDescription();
        this.shipLocation = save.getShipLocation();
        this.shipImageSaveLocation = modifyShipImagesSaveLocation;
    }
}
