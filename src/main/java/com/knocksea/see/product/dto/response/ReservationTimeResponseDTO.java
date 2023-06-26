package com.knocksea.see.product.dto.response;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.ReservationTime;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

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
    private int timeCurrentUser;
    private LocalDate timeDate;
    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime timeStart;
    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime timeEnd;

    public ReservationTimeResponseDTO(ReservationTime time) {
        this.timeId = time.getTimeId();
        this.timeVerify = time.getTimeVerify();
        this.timeMaxUser = time.getTimeMaxUser();
        this.timeCurrentUser = time.getTimeCurrentUser();
        this.timeDate = time.getTimeDate();
        this.timeStart = time.getTimeStart();
        this.timeEnd = time.getTimeEnd();
    }
}
