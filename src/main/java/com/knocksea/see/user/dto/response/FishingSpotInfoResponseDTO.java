package com.knocksea.see.user.dto.response;

import com.knocksea.see.product.entity.ProductCategory;
import lombok.*;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
@Setter
public class FishingSpotInfoResponseDTO {

    //배 번호
    private Long spotId;

    //배 카테고리
    private ProductCategory category;

    //배 설명
    private String spotDescription;

    //좋아요 개수
    private int spotLikeCount;

//    //선착장 위치
//    private String spotLocation;

    //배 이름
    private String spotName;

    //선장님 이름
    private String userName;

    //배 이미지저장경로
    List<String> spotImageLocation;
}
