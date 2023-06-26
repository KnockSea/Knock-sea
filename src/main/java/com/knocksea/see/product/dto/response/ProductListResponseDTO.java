package com.knocksea.see.product.dto.response;

import com.knocksea.see.product.entity.ViewProduct;
import lombok.*;

import java.util.List;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductListResponseDTO {

    private int count;
    private PageResponseDTO pageInfo;
    private List<ProductDetailResponseDTO> productDetail;

    private List<ViewProduct> allAddress;
}
