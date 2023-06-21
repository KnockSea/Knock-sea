package com.knocksea.see.product.dto.response;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.product.entity.Product;
import lombok.*;

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

    Map<Long, String> shipProduct;
    Map<Long, String> spotProduct;
    Map<Long, String> eduProduct;


    public mainListResponseDTO(List<Product> productShip, List<Product> productSpot, List<Edu> edu) {
        this.shipProduct = shipProduct;
        this.spotProduct = spotProduct;
        this.eduProduct = eduProduct;
    }
}
