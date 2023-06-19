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
        this.heartType = String.valueOf(heart.getHeartType());
        this.userId = heart.getUser().getUserId();
        this.eduId = heart.getEdu() != null ? heart.getEdu().getEduId() : null;
        this.productId = heart.getProduct() != null ? heart.getProduct().getProductId() : null;
    }
}
