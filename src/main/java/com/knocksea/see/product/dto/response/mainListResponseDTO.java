package com.knocksea.see.product.dto.response;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.user.entity.SeaImage;
import lombok.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class mainListResponseDTO {

    private Long id;
    private String type;
    private String imgUrl;



    public mainListResponseDTO(Product p, SeaImage img) {
        this.id = p.getProductId();
        this.type = p.getProductType();
        this.imgUrl = img.getImageName();
    }

    public mainListResponseDTO(Edu e, SeaImage img) {
        this.id = e.getEduId();
        this.type = "EDU";
        this.imgUrl = img.getImageName();
    }
}
