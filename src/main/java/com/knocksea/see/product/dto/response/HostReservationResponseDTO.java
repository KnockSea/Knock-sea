package com.knocksea.see.product.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
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
public class HostReservationResponseDTO {

    private int userCount;
    private LocalTime timeEnd;
    private LocalTime timeStart;
    private String imgUrl;
    @JsonFormat(pattern = "yyyy년 MM월 dd일")
    private LocalDate reserveDate;
    private String reserveTitle;
    private int reservePrice;

    private Long id;
    private Long reservationId;

    private String type;

    private boolean isReviewed;
    private String statusValid;
}
