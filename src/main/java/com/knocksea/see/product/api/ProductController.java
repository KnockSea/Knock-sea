package com.knocksea.see.product.api;

import com.knocksea.see.product.dto.request.ProductRequestDTO;
import com.knocksea.see.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    // 상품 등록
    @PostMapping("/product")
    public ResponseEntity<?> createProduct(
            @RequestBody ProductRequestDTO dto) {



        return null;
    }

    // 상품 상세 조회
    @GetMapping("/{productId}")
    public ResponseEntity<?> detailProduct(Long productId) {

        return null;
    }

}
