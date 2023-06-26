package com.knocksea.see.product.dto.request;

import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDeleteRequestDTO {

    private Long productId;
    private String productType;

}
