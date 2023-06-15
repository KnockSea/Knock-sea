package com.knocksea.see.product.dto.request;

import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductModifyRequestDTO {

    // 수정할때 뭐받지?
    // 시간 정보 일자 별로 쭉 뿌려주고 수정 시켜? 이건 아닌거 같은데...
    // 그리고 상품에 예약 정보 있으면 수정도 못시켜 주는데 / 금액 은 싯가라 치고?
    // 예약할때 장소정보를 저장 시키고 장소 정보가 수정된다면 표시를 해준다?
    // 일정 거리이상 수정 못하게 막아야 되나 나중엔?
    private Long productId;
    private String productService;
    private String productFullAddress;
    private String productInfo;
    private String productLocationInfo;

    // toEntity 만들어 보자~





}
