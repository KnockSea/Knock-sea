package com.knocksea.see.product.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.review.dto.response.ReviewDetailResponseDTO;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDetailResponseDTO {

    private Long productId;
    private String title;
    private int price;
    @JsonFormat(pattern = "yyyy/MM/dd")
    private LocalDateTime inputDate;
    private String service;
    private String fullAddress;
    private String info;
    private String locationInfo;
    private Long userId;
    private String userName;
    private String userImgUrl;
    private int maxUser;

    private String typeP;

    // 예약 가능 시간 list있어야함
    // -> 예약 가능 시간 dto만들어서 그걸 list화 해야 되겠는데?
    private List<ReservationTimeResponseDTO> timeList;

    private List<ReviewDetailResponseDTO> reviewList;

    // 이미지 경로들
    private List<String> imgUrl;

    private String mainImgUrl;

    public ProductDetailResponseDTO(Product product, String imageName, int timeMaxUser) {
        this.productId = product.getProductId();
        this.title = product.getProductTitle();
        this.price = product.getProductPrice();
        this.inputDate = product.getProductInputDate();
        this.service = product.getProductService();
        this.fullAddress = product.getProductFullAddress();
        this.info = product.getProductInfo();
        this.locationInfo = product.getProductLocationInfo();
        this.userId = product.getUser().getUserId();
        this.maxUser = timeMaxUser;
        this.userName = product.getUser().getUserName();
        this.userImgUrl = product.getUser().getProfileImg();
        this.mainImgUrl = imageName;
        this.typeP = product.getProductType();
    }


    public ProductDetailResponseDTO(Product product
            , List<ReservationTimeResponseDTO> dtoTimeList
            , List<ReviewDetailResponseDTO> dtoReviewList
            , List<String> imgUrls) {
        this.timeList = new ArrayList<>();
        this.reviewList = new ArrayList<>();
        this.imgUrl = new ArrayList<>();
        this.productId = product.getProductId();
        this.title = product.getProductTitle();
        this.price = product.getProductPrice();
        this.inputDate = product.getProductInputDate();
        this.service = product.getProductService();
        this.fullAddress = product.getProductFullAddress();
        this.info = product.getProductInfo();
        this.locationInfo = product.getProductLocationInfo();
        this.userId = product.getUser().getUserId();
        this.timeList = dtoTimeList;
        this.reviewList = dtoReviewList;
        this.userName = product.getUser().getUserName();
        this.userImgUrl = product.getUser().getProfileImg();
        this.imgUrl = imgUrls;
        this.typeP = product.getProductType();
//        this.maxUser = product.getMaxUser();
    }
}