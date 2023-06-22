package com.knocksea.see.product.dto.response;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.product.entity.Product;
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



    public mainListResponseDTO(Product p) {
    }
}
