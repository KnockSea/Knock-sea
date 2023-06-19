package com.knocksea.see.product.repository;

import com.knocksea.see.product.dto.response.ProductDetailResponseDTO;

public interface ProductDetailService {

    ProductDetailResponseDTO getDetail(Long productId);
}
