package com.knocksea.see.heart.dto.response;

import com.knocksea.see.heart.entity.Heart;
import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeartDetailResponseDTO {

    private Long heartId;
    private String heartType;
    private Long userId;
    private Long eduId;
    private Long productId;

    public HeartDetailResponseDTO(Heart heart) {
        this.heartId = heart.getHeartId();
        if (heart.getEdu() != null ) {
            this.heartType = "CLASS";
        } else if (heart.getProduct() != null || heart.getProduct().equals("FISHING")) {
            this.heartType = "FISHING";
        } else if (heart.getProduct() != null || heart.getProduct().equals("SHIP")) {
            this.heartType = "SHIP";
        }
        else {
            this.heartType = String.valueOf(heart.getHeartType());
        }
        this.userId = heart.getUser().getUserId();
        Long eduId = heart.getEdu() != null ? (long) heart.getEdu().getEduId() : null;
        this.eduId = eduId;
        Long productId = heart.getProduct() != null ? heart.getProduct().getProductId() : null;
        this.productId = productId;
    }
}
