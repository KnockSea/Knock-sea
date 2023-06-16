package com.knocksea.see.product.service;

import com.knocksea.see.product.dto.request.ProductModifyRequestDTO;
import com.knocksea.see.product.dto.request.ProductRequestDTO;
import com.knocksea.see.product.dto.response.PageResponseDTO;
import com.knocksea.see.product.dto.response.ProductListResponseDTO;
import com.knocksea.see.product.dto.response.ProductDetailResponseDTO;
import com.knocksea.see.product.dto.response.ReservationTimeResponseDTO;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.product.repository.ProductDetailService;
import com.knocksea.see.product.repository.ProductRepository;
import com.knocksea.see.product.dto.request.PageDTO;
import com.knocksea.see.product.repository.ReservationTimeRepository;
import com.knocksea.see.review.dto.response.ReviewDetailResponseDTO;
import com.knocksea.see.review.repository.ReviewRepository;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ProductService implements ProductDetailService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    private final ReviewRepository reviewRepository;

    private final ReservationTimeRepository reservationTimeRepository;

    public Product getProduct(Long productId) {
        return productRepository.findById(productId).orElseThrow(() ->
                new RuntimeException("상품 정보가 없습니다."));
    }

    // 메인에서 보이는 상품 전체 목록
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
    @Override
    public ProductDetailResponseDTO getDetail(Long productId) {
        Product product = getProduct(productId);

        // 리뷰 목록(상품번호로 조회)  // null 뜨는지 확인해야댐
        List<ReviewDetailResponseDTO> reviewResponseList = reviewRepository.findAllByProduct(product).stream()
                .map(ReviewDetailResponseDTO::new).collect(Collectors.toList());

        // 예약 가능 시간 목록(상품번호로 조회)
        List<ReservationTimeResponseDTO> timeResponseDTOList = reservationTimeRepository.findAllByProduct(product).stream()
                .map(ReservationTimeResponseDTO::new).collect(Collectors.toList());

        return new ProductDetailResponseDTO(product, timeResponseDTOList, reviewResponseList);
    }

    // 상품 등록 기능
    public ProductDetailResponseDTO create(ProductRequestDTO dto) {
        // 상품을 먼저 등록하고 -> 시간 정보를 등록해야 한다.
        User user = userRepository.findById(dto.getUserId()).
                orElseThrow(() -> new RuntimeException("회원 정보가 없습니다"));
        Product saveProduct = productRepository.save(dto.toProductEntity(user));

        for (int i = 0; i < dto.getTimeDate().size(); i++) {
            for (int j = 0; j < dto.getTimeStart().size(); j++) {
                ReservationTime reservationTime
                        = reservationTimeRepository.save(
                                dto.toReservationTimeEntity(i, j, saveProduct));
            }
        }
        return getDetail(saveProduct.getProductId());
    }

    public void modify(ProductModifyRequestDTO dto) {

    }

}
