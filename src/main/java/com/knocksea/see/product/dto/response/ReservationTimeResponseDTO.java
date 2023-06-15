package com.knocksea.see.product.dto.response;

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
public class ReservationTimeResponseDTO {
    private Long timeId;
    private String timeVerify;
    private int timeMaxUser;
    private String timeToString;

    public ReservationTimeResponseDTO(ReservationTime time) {
        this.timeId = time.getTimeId();
        this.timeVerify = time.getTimeVerify();
        this.timeMaxUser = time.getTimeMaxUser();
        this.timeToString = time.getTimeDate() + "년 "
                + time.getTimeStart() + "월 "
                + time.getTimeEnd() + "일";
    }
}
