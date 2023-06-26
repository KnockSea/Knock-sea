package com.knocksea.see.product.api;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.exception.NoneMatchUserException;
import com.knocksea.see.product.dto.request.PageDTO;
import com.knocksea.see.product.dto.request.ProductRequestDTO;
import com.knocksea.see.product.dto.response.ProductDetailResponseDTO;
import com.knocksea.see.product.dto.response.ProductListResponseDTO;
import com.knocksea.see.product.dto.response.mainListResponseDTO;
import com.knocksea.see.product.service.ProductService;
import com.knocksea.see.user.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;


    // 상품 등록
    @PostMapping
    public ResponseEntity<?> createProduct(

            @Validated @RequestPart(value = "productDTO") ProductRequestDTO dto, BindingResult result
    , @AuthenticationPrincipal TokenUserInfo userInfo
    , @RequestPart(value = "productImages") List<MultipartFile> productImages) throws RuntimeException {

//        유저 정보 dto에서 빼서 토큰에서 뜯어 와야 된당
//        @AuthenticationPrincipal TokenUserInfo userInfo
//        이미지도 받아서 @RequestPart로 바꾸고 dto도 body-> part로 변경 해야됌

        log.info("/api/v1/products POST! - {}", dto);

        if (result.hasErrors()) {
            log.warn("이거 터지는거임? : {}",result.toString());
            return ResponseEntity.badRequest().body(result.getFieldError());
        }


        try {
            if(productImages!=null){
                for (MultipartFile shipImage : productImages) {
                    log.info("shipImages : {}",shipImage);
                }

                ProductDetailResponseDTO productDetailResponseDTO = productService.create(dto, userInfo, productImages);
                return ResponseEntity.ok().body(productDetailResponseDTO);
            } else {
                return ResponseEntity.badRequest().body("이미지는 필수 입니다.");
            }
        } catch (RuntimeException e) {
//            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("이미지 저장에 실패하였습니다.");
        }
    }

    // 상품 상세 조회 -> 비로그인도 조회 가능
    @GetMapping("/{productId}")
    public ResponseEntity<?> detailProduct(@PathVariable Long productId) {

        log.info("/api/v1/{} - GET ! ", productId);

        ProductDetailResponseDTO detail = productService.getDetail(productId);
        return ResponseEntity.ok().body(detail);
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<?> removeProduct(
            @PathVariable Long productId
            , @AuthenticationPrincipal TokenUserInfo userInfo)
    {
        try {
            boolean flag = productService.delete(productId, userInfo);
            if (flag) {
                return ResponseEntity.internalServerError().body("상품 삭제에 실패하였습니다.");
            }
            return ResponseEntity.ok().body("삭제가 완료되었습니다.");

        } catch (RuntimeException e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH})
    public ResponseEntity<?> modifyProduct(
            @RequestBody ProductRequestDTO dto
            , @AuthenticationPrincipal TokenUserInfo userInfo
    ) {

        try {
            ProductDetailResponseDTO modify = productService.modify(dto, userInfo);
            return ResponseEntity.ok().body(modify);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    // 메인 페이지 배, 낚시터, 에듀 3개씩 가져옴 (아직 페이징 처리 없음)
    @GetMapping("/main/ship")
    public ResponseEntity<?> mainPageShip() {

//        log.info("/api/v1/products GET ! - {} ", );

        return ResponseEntity.ok().body(productService.shipMainList());
    }

    @GetMapping("/main/spot")
    public ResponseEntity<?> mainPageSpot() {

//        log.info("/api/v1/products GET ! - {} ", );

        return ResponseEntity.ok().body(productService.spotMainList());
    }

    @GetMapping("/product-list")
    public ResponseEntity<?> productList(PageDTO pageDTO) {

        log.info("/api/v1/products/product-list GET ! - {} ", pageDTO);
        ProductListResponseDTO listResponseDTO = null;
        try {
            listResponseDTO = productService.findAll(pageDTO);
            return ResponseEntity.ok().body(listResponseDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
