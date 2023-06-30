package com.knocksea.see.product.dto.response;

import com.knocksea.see.product.entity.Product;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
@Setter
@Getter
public class HostInfoResponseDTO {

//    private Long productId;
    private String title; // 상품 제목
    private double rateAvg; // 상품 평점
    private String info; // 상품 소개
    private String imgUrl; // 상품 이미지


}
