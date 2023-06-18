package com.knocksea.see.product.api;

import com.knocksea.see.product.dto.request.ProductRequestDTO;
import com.knocksea.see.product.dto.response.ProductDetailResponseDTO;
import com.knocksea.see.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    // 상품 등록
    @PostMapping
    public ResponseEntity<?> createProduct(
            @Validated @RequestBody ProductRequestDTO dto, BindingResult result) {
//        유저 정보 dto에서 빼서 토큰에서 뜯어 와야 된당
//        @AuthenticationPrincipal TokenUserInfo userInfo
//        이미지도 받아서 @RequestPart로 바꾸고 dto도 body-> part로 변경 해야됌

        log.info("/api/v1/products POST! - {}", dto);

        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest().body(result.getFieldError());
        }

        try {
            ProductDetailResponseDTO productDetailResponseDTO = productService.create(dto);
            return ResponseEntity.ok().body(productDetailResponseDTO);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 상품 상세 조회
    @GetMapping("/{productId}")
    public ResponseEntity<?> detailProduct(@PathVariable Long productId) {

        log.info("/api/v1/{} - GET ! ", productId);

        ProductDetailResponseDTO detail = productService.getDetail(productId);
        return ResponseEntity.ok().body(detail);
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<?> removeProduct(@PathVariable Long productId) {



        return null;
    }

    @RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH})
    public ResponseEntity<?> modifyProduct(@RequestBody ProductRequestDTO dto) {

        ProductDetailResponseDTO modify = productService.modify(dto);

        return ResponseEntity.ok().body(modify);

    }
}
