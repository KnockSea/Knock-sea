package com.knocksea.see.user.dto.response;


import com.knocksea.see.user.entity.SeaImage;
import com.knocksea.see.user.entity.Ship;
import lombok.*;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
@Setter
public class ShipInfoResponseDTO {

    private Ship ship;

//    private List<String> shiplocationList;


    //저장 위치리턴하기!
//    public void toList(List<SeaImage> shipImageList){
//        for (SeaImage seaImage : shipImageList) {
//            shiplocationList.add(seaImage.getImageName());
//        }
//    }
}
