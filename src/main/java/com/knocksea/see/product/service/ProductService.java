package com.knocksea.see.product.service;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.edu.repository.EduRepository;
import com.knocksea.see.exception.NoneMatchUserException;
import com.knocksea.see.product.dto.request.ProductRequestDTO;
import com.knocksea.see.product.dto.response.*;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.product.entity.ViewProduct;
import com.knocksea.see.product.repository.*;
import com.knocksea.see.product.dto.request.PageDTO;
import com.knocksea.see.review.dto.response.ReviewDetailResponseDTO;
import com.knocksea.see.review.entity.Review;
import com.knocksea.see.review.repository.ReviewRepository;
import com.knocksea.see.review.service.ReviewService;
import com.knocksea.see.user.entity.FishingSpot;
import com.knocksea.see.user.entity.SeaImage;
import com.knocksea.see.user.entity.Ship;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.FishingSpotRepository;
import com.knocksea.see.user.repository.ImageRepository;
import com.knocksea.see.user.repository.ShipRepository;
import com.knocksea.see.user.repository.UserRepository;
import com.knocksea.see.user.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    private final ViewProductRepository viewProductRepository;
    private final ImageRepository imageRepository;
    private final ImageService imageService;
    private final ReviewService reviewService;

    public Product getProduct(Long productId) {
        return productRepository.findById(productId).orElseThrow(() ->
                new RuntimeException("상품 정보가 없습니다."));
    }

    // 메인에서 보이는 상품 전체 목록
    public ProductListResponseDTO findAll(PageDTO pageDTO) throws RuntimeException{
        PageRequest pageable =
                PageRequest.of(pageDTO.getPage() - 1
                    , pageDTO.getSize()
                    , Sort.by("productInputDate").descending()
                );
//        type, keyword
//        Page<Product> products = productRepository.findAll(pageable);
        Page<Product> products = productRepository.findAllByType(pageable, pageDTO.getType());

        List<ProductDetailResponseDTO> prodDetailList = products.stream()
                .map(product -> {
                        List<SeaImage> allByProduct = imageRepository.findAllByProduct(product);
                        if (allByProduct == null) {
                            throw new RuntimeException("상품이 없습니다.");
                        }
                        List<ReservationTime> rt = reservationTimeRepository.findAllByProduct_ProductId(product.getProductId());
                        return new ProductDetailResponseDTO(product, allByProduct.get(0).getImageName(), rt.get(0).getTimeMaxUser());
                    }
                ).collect(Collectors.toList());

        List<ViewProduct> allAddress = viewProductRepository.findAll();
        // 이러면.. 페이지 넘길때마다 지도 다시 뿌리는건데 어쩌지

        // 이미지랑 예약 가능 유저 수


        return ProductListResponseDTO.builder()
                .count(prodDetailList.size())
                .pageInfo(new PageResponseDTO(products))
                .productDetail(prodDetailList)
                .allAddress(allAddress)
                .build();

    }

    // 상품 상세조회 기능 (예약 가능 시간 정보 포함)
    @Override
    public ProductDetailResponseDTO getDetail(Long productId) {
        Product product = getProduct(productId);
        User user = product.getUser();
//        List<SeaImage> images = imageRepository.findAllByProduct(product);
        List<String> imgUrls = new ArrayList<>();
        imageRepository.findAllByProduct(product).forEach( i -> {
            imgUrls.add(i.getImageName());
        });
        // 리뷰 목록(상품번호로 조회)  // null 뜨는지 확인해야댐
        List<ReviewDetailResponseDTO> reviewResponseList = reviewRepository.findAllByProduct(product).stream()
                .map(review -> {
                    return new ReviewDetailResponseDTO(review, reviewService.imgName(review));
                }).collect(Collectors.toList());

        // 예약 가능 시간 목록(상품번호로 조회)
        List<ReservationTimeResponseDTO> timeResponseDTOList = reservationTimeRepository.findAllByProduct(product).stream()
                .map(ReservationTimeResponseDTO::new).collect(Collectors.toList());

        return new ProductDetailResponseDTO(product, timeResponseDTOList, reviewResponseList, imgUrls);
    }

    // 상품 등록 기능
    public ProductDetailResponseDTO create(ProductRequestDTO dto, TokenUserInfo userInfo,
                                           List<MultipartFile> productImages
    ) throws RuntimeException, IOException {
        // 상품을 먼저 등록하고 -> 시간 정보를 등록해야 한다.
        log.warn("여기까지 들어옵니까?");
        User user = userRepository.findById(userInfo.getUserId()).
                orElseThrow(() -> new RuntimeException("회원 정보가 없습니다"));

        if (shipRepository.findByUser(user) == null && fishingSpotRepository.findByUser(user) == null) {
            throw new RuntimeException("배 또는 낚시터 정보를 등록해 주세요.");
        }

        if (productRepository.existsByProductTypeAndUserUserId(dto.getProductLabelType(), user.getUserId())) {
            throw new RuntimeException("이미 등록된 상품입니다.");
        }

        Product saveProduct = productRepository.save(dto.toProductEntity(user));
        log.warn("사베 프로덕트 : {}", saveProduct);

        List<String> imgUrlNames = imageService.saveProductImg(productImages, userInfo, saveProduct);

        for (int i = 0; i < dto.getTimeDate().size(); i++) {
            for (int j = 0; j < dto.getTimeStart().size(); j++) {
                reservationTimeRepository.save(dto.toReservationTimeEntity(i, j, saveProduct));
                log.warn("돌고 있니? : {}", j);
            }
        }

        return getDetail(saveProduct.getProductId());
    }

    public ProductDetailResponseDTO modify(ProductRequestDTO dto, TokenUserInfo userInfo) throws RuntimeException{

        if(!dto.getUserId().equals(userInfo.getUserId())) {
            throw new RuntimeException("본인의 상품만 수정 가능합니다.");
        }

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

    // 메인페이지 9개만 달래~
    public List<mainListResponseDTO> shipMainList() {
        List<Product> productsShip = productRepository.findTop9ByProductType("SHIP");
        log.info("9개 왜 못불러와  ~ : {}",productsShip);
        return getCollect(productsShip);
    }

    public List<mainListResponseDTO> spotMainList() {
        List<Product> productsSpot = productRepository.findTop9ByProductType("SPOT");

        return getCollect(productsSpot);

    }

    private List<mainListResponseDTO> getCollect(List<Product> product) {
        return product.stream()
                .map(p -> {
//                    SeaImage seaImage = imageRepository.findByProduct(p);
                    List<SeaImage> seaImage = imageRepository.findByProduct(p);
                    log.warn("하나만 가져올거라!! : {}", seaImage);
//                            .orElseThrow(() -> new RuntimeException("이미지정보가 잘못 되었습니다."));
                    return new mainListResponseDTO(p, seaImage.get(0));
                }).collect(Collectors.toList());
    }

    public HostInfoResponseDTO hostUser(Long productId, String productType) {
        Product target = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));

        User owner = target.getUser();
        Ship ship = new Ship();
        FishingSpot spot = new FishingSpot();
        HostInfoResponseDTO hostDTO = new HostInfoResponseDTO();
        double score = 0;
        if (productType.equals("SHIP")) {
            ship = shipRepository.findByUser(owner);
            List<SeaImage> shipImg = imageRepository.findByShip(ship);
            List<Review> pReview = getByProduct(target);
            for (Review review : pReview) {
                score += review.getReviewRating();
            }
            hostDTO = HostInfoResponseDTO.builder()
                    .title(ship.getShipName())
                    .imgUrl(shipImg.get(0).getImageName())
                    .info(ship.getShipDescription())
                    .rateAvg(score/pReview.size())
                    .build();
        } else {
            spot = fishingSpotRepository.findByUser(owner);
            List<SeaImage> spotImg = imageRepository.findBySpot(spot);
            List<Review> pReview = getByProduct(target);
            for (Review review : pReview) {
                score += review.getReviewRating();
            }
            hostDTO = HostInfoResponseDTO.builder()
                    .title(spot.getSpotTitle())
                    .imgUrl(spotImg.get(0).getImageName())
                    .info(spot.getSpotDescription())
                    .rateAvg(score/pReview.size())
                    .build();
        }
        return hostDTO;
    }

    public List<HostReviewResponseDTO> hostReview(Long productId) {
        Ship ship = shipRepository.findById(1L).orElseThrow(() -> new RuntimeException("배 정보가 없습니다."));
        User user = ship.getUser();
        Product pro = productRepository.findByTargetProduct(user, "SHIP");

//        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("상품 정보가 없습니다."));

        List<Review> byProduct = getByProduct(pro);
        log.warn("이거 안되면 큰일난다. {}", byProduct);
        List<HostReviewResponseDTO> reviewList = byProduct.stream().map(r -> {
            String s = reviewService.imgName(r);

            return HostReviewResponseDTO.builder()
                    .reviewId(r.getReviewId())
                    .reviewContent(r.getReviewContent())
                    .reviewRating(r.getReviewRating())
                    .reviewType(r.getReviewType())
                    .image(s)
                    .userName(r.getUser().getUserName())
                    .build();
        }).collect(Collectors.toList());

        return reviewList;
    }

    public void hostProduct(Long userId, String type) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
        if (type.equals("SHIP")) {
//            productRepository.findByUserAndType(user, type);

        }
    }

    // 얘도 ... 리뷰에 만들어야 되는데...
    private List<Review> getByProduct(Product product) {
        return reviewRepository.findByProduct(product);
    }
}
