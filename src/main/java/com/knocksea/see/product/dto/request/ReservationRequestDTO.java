package com.knocksea.see.product.dto.request;

import com.knocksea.see.product.entity.Reservation;
import com.knocksea.see.user.entity.User;
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
public class ReservationRequestDTO {

    private String reservationType;
//    private LocalDate reservationDate;
//    private String reservationTime;
    private String reservationAddress;
    private int reservationUserCount;
    private int reservationPrice;

    // 유저번호(예약자)
    private Long userId;
    // 상품번호
    private Long productId;
    private int eduId;
    private Long reservationTimeId;

    public Reservation toEntity(ReservationRequestDTO dto) {

        return Reservation.builder()
                .reservationType(dto.getReservationType())
                .reservationPrice(dto.getReservationPrice())
                .reservationAddress(dto.getReservationAddress())
                .reservationUserCount(dto.getReservationUserCount())
                .build();
    }


}
