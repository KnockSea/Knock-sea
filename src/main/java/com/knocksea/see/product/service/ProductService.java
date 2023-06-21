package com.knocksea.see.product.service;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.repository.EduRepository;
import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.exception.NoneMatchUserException;
import com.knocksea.see.product.dto.request.ProductDeleteRequestDTO;
import com.knocksea.see.product.dto.request.ProductModifyRequestDTO;
import com.knocksea.see.product.dto.request.ProductRequestDTO;
import com.knocksea.see.product.dto.response.*;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.product.repository.ProductDetailService;
import com.knocksea.see.product.repository.ProductRepository;
import com.knocksea.see.product.dto.request.PageDTO;
import com.knocksea.see.product.repository.ReservationRepository;
import com.knocksea.see.product.repository.ReservationTimeRepository;
import com.knocksea.see.review.dto.response.ReviewDetailResponseDTO;
import com.knocksea.see.review.repository.ReviewRepository;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.FishingSpotRepository;
import com.knocksea.see.user.repository.ShipRepository;
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
    private final ReservationRepository reservationRepository;
    private final ShipRepository shipRepository;
    private final FishingSpotRepository fishingSpotRepository;
    private final EduRepository eduRepository;

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
        User user = product.getUser();

        // 리뷰 목록(상품번호로 조회)  // null 뜨는지 확인해야댐
        List<ReviewDetailResponseDTO> reviewResponseList = reviewRepository.findAllByProduct(product).stream()
                .map(ReviewDetailResponseDTO::new).collect(Collectors.toList());

        // 예약 가능 시간 목록(상품번호로 조회)
        List<ReservationTimeResponseDTO> timeResponseDTOList = reservationTimeRepository.findAllByProduct(product).stream()
                .map(ReservationTimeResponseDTO::new).collect(Collectors.toList());

        return new ProductDetailResponseDTO(product, timeResponseDTOList, reviewResponseList);
    }

    // 상품 등록 기능
    public ProductDetailResponseDTO create(ProductRequestDTO dto, TokenUserInfo userInfo) throws RuntimeException{
        // 상품을 먼저 등록하고 -> 시간 정보를 등록해야 한다.
        User user = userRepository.findById(userInfo.getUserId()).
                orElseThrow(() -> new RuntimeException("회원 정보가 없습니다"));

        if (shipRepository.findByUser(user) == null && fishingSpotRepository.findByUser(user) == null) {
            throw new RuntimeException("배 또는 낚시터 정보를 등록해 주세요.");

            // 에러를 다르게해서 배, 낚시터 등록 폼으로 넘겨 버릴까?
        }

        if (productRepository.existsByProductTypeAndUserUserId(dto.getProductLabelType(), user.getUserId())) {
            throw new RuntimeException("이미 등록된 상품입니다.");
        }

        Product saveProduct = productRepository.save(dto.toProductEntity(user));

        for (int i = 0; i < dto.getTimeDate().size(); i++) {
            for (int j = 0; j < dto.getTimeStart().size(); j++) {
                reservationTimeRepository.save(dto.toReservationTimeEntity(i, j, saveProduct));
            }
        }

        return getDetail(saveProduct.getProductId());
    }

    public ProductDetailResponseDTO modify(ProductRequestDTO dto) {

        User user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("유저 정보가 잘못되었습니다."));

        Product targetProduct = productRepository.findByUserUserId(user.getUserId());
        // 이거... findAll 하고 타입으로 필터링해야 되겠는데?

        if (reservationRepository.existsByProductProductTypeAndProductProductId(dto.getProductLabelType(), targetProduct.getProductId())) {
            throw new RuntimeException("예약 정보가 존재하여 수정이 불가능 합니다.");
        }

        int deleteCount = reservationTimeRepository.deleteByProductProductId(targetProduct.getProductId());

        if (deleteCount >= 1) {
            System.out.println("삭제 성공");
        }

        for (int i = 0; i < dto.getTimeDate().size(); i++) {
            for (int j = 0; j < dto.getTimeStart().size(); j++) {
                reservationTimeRepository.save(dto.toReservationTimeEntity(i, j, targetProduct));
            }
        }

        return getDetail(targetProduct.getProductId());
    }

    public boolean delete(Long productId, TokenUserInfo userInfo) throws RuntimeException, NoneMatchUserException{

        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("상품 정보가 없습니다."));

        if (!product.getUser().getUserId().equals(userInfo.getUserId())) {
            throw new NoneMatchUserException("본인의 글만 삭제 가능합니다.");
        }

//        List<ReservationTime> productHasTime = reservationTimeRepository.findAllByProduct(product);

        if (reservationRepository.findByProductProductId(product.getProductId()).isPresent()) {
            throw new RuntimeException("예약 정보가 존재하여 삭제할 수 없습니다.");
        }
        // 해당 상품이 가진 예약 가능 시간 정보 개수
//        int countByProduct = reservationTimeRepository.countByProduct(product);

        // 예약 가능 시간들 먼저 삭제
        reservationTimeRepository.deleteByProductProductId(productId);

        // 예약 가능 시간 없으면 상품 삭제
        productRepository.deleteById(productId);

        return productRepository.findById(productId).isPresent();
    }


    public mainListResponseDTO showMainList() {
        List<Product> productsShip = productRepository.findTop3ByProductTypeOrderByProductInputDateDesc("SHIP");

        List<Product> productsSpot = productRepository.findTop3ByProductTypeOrderByProductInputDateDesc("SPOT");

        List<Edu> edu = eduRepository.findTop3ByOrderByCreateDate();


        return new mainListResponseDTO(productsShip, productsSpot, edu);
    }
}
