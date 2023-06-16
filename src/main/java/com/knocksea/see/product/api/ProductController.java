package com.knocksea.see.product.api;

import com.knocksea.see.product.dto.request.ProductRequestDTO;
import com.knocksea.see.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    @PostMapping("/product")
    public ResponseEntity<?> createProduct(ProductRequestDTO dto) {



        return null;
    }
}
