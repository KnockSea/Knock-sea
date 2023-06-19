package com.knocksea.see.product.dto.request;

import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationCancelDTO {

    private Long userId;
    private Long productId;
    private Long reservationId;
    private String productType;
    private Long eduId;

}
