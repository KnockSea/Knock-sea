package com.knocksea.see.product.dto.request;

import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.ReservationTime;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationTimeRequestDTO {

    private String timeLabelType;
    private String timeVerify;
    private int timeMaxUser;
    private LocalDate timeDate;
    private LocalTime timeStart;
    private LocalTime timeEnd;

    public ReservationTime toEntity(Product product) {
        return ReservationTime.builder()
                .timeLabelType(this.timeLabelType)
                .timeVerify(this.timeVerify)
                .timeDate(this.timeDate)
                .timeStart(this.timeStart)
                .timeEnd(this.timeEnd)
                .timeMaxUser(this.timeMaxUser)
                .product(product)
                .build();
    }

}
