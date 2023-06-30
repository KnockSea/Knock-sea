package com.knocksea.see.validation.dto.response;

import com.knocksea.see.product.dto.response.PageResponseDTO;
import com.knocksea.see.product.dto.response.ProductDetailResponseDTO;
import lombok.*;

import java.util.List;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ValidationTypeListResponseDTO {

    private int count;
    private PageResponseDTO pageInfo;
    private List<ValidationListResponseDTO> validationListResponseDTO;
}
