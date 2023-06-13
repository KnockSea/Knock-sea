package com.knocksea.see.product.service;

import com.knocksea.see.product.dto.request.ProductRequestDTO;
import com.knocksea.see.product.dto.response.PageResponseDTO;
import com.knocksea.see.product.dto.response.ProductListResponseDTO;
import com.knocksea.see.product.dto.response.ProductDetailResponseDTO;
import com.knocksea.see.product.dto.response.ReservationTimeResponseDTO;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.product.repository.ProductRepository;
import com.knocksea.see.product.dto.request.PageDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Product getProduct(Long productId) {
        return productRepository.findById(productId).orElseThrow(() ->
                new RuntimeException("상품 정보가 없습니다."));
    }

    public ProductListResponseDTO findAll(PageDTO pageDTO) {
        PageRequest pageable =
                PageRequest.of(pageDTO.getPage() - 1
                    , pageDTO.getSize()
                    , Sort.by("productInputDate").descending()
                );

        Page<Product> products = productRepository.findAll(pageable);

        List<ProductDetailResponseDTO> prodDetailList = products.stream()
                .map(ProductDetailResponseDTO::new)
                .collect(Collectors.toList());

        return ProductListResponseDTO.builder()
                .count(prodDetailList.size())
                .pageInfo(new PageResponseDTO(products))
                .products(prodDetailList)
                .build();

    }

    // 상품 상세조회 기능 (예약 가능 시간 정보 포함)
    public ProductDetailResponseDTO getDetail(Long productId) {
        Product product = getProduct(productId);
//        List<ReservationTime> timeList = productRepository.findByProductId(productId);
        List<ReservationTimeResponseDTO> timeResponseDTOList
                = productRepository.findByProductId(productId).stream()
                .map(ReservationTimeResponseDTO::new)
                .collect(Collectors.toList());
        return new ProductDetailResponseDTO(product, timeResponseDTOList);
    }

    public boolean create(ProductRequestDTO dto) {

        return false;
    }


}
