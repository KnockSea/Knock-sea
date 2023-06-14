package com.knocksea.see.product.dto.request;

import com.knocksea.see.product.entity.Product;
import com.knocksea.see.user.entity.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
// 클라이언트에서 넘어올 dto
public class ProductRequestDTO {

    // 여기 상품 등록 정보 필드 선언
    private String productTitle;
    private int productPrice;
    private LocalDateTime productInputDate;
    private String productService;
    private String productInfo;
    private String productFullAddress;
    private String productLocationInfo;
    private Long userId;

    // 예약 가능 시간 정보 목록 필드
    private List<ReservationTimeRequestDTO> reservationTimeRequestDTO;

    public Product toEntity(User user) {
        return Product.builder()
                .productTitle(this.productTitle)
                .productPrice(this.productPrice)
                .productInputDate(LocalDateTime.now())
                .productService(this.productService)
                .productInfo(this.productInfo)
                .productFullAddress(this.productFullAddress)
                .productLocationInfo(this.productLocationInfo)
                .user(user)
                .build();
    }

}
