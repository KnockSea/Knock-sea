package com.knocksea.see.product.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.Reservation;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.user.entity.SeaImage;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationResponseDTO {

    private int userCount;
    private LocalTime timeEnd;
    private LocalTime timeStart;
    private String imgUrl;
    @JsonFormat(pattern = "yyyy년 MM월 dd일")
    private LocalDate reserveDate;
    private String reserveTitle;
    private int reservePrice;

    private Long id;

    private String type;

    private boolean isReviewed;

    public ReservationResponseDTO(Reservation r, ReservationTime time, Product product, SeaImage img) {
        this.imgUrl = img.getImageName();
        this.reserveDate=time.getTimeDate();
        this.reserveTitle = product.getProductTitle();
        this.reservePrice = r.getReservationPrice();
        this.timeStart = time.getTimeStart();
        this.timeEnd = time.getTimeEnd();
        this.userCount = r.getReservationUserCount();
        this.id=product.getProductId();
        this.type=r.getReservationType();
    }

    public ReservationResponseDTO(Reservation r, ReservationTime time, Edu edu, SeaImage img) {
        this.imgUrl = img.getImageName();
        this.reserveTitle = edu.getEduTitle();
        this.reservePrice = r.getReservationPrice();
        this.timeStart = time.getTimeStart();
        this.timeEnd = time.getTimeEnd();
        this.reserveDate=time.getTimeDate();
        this.userCount = r.getReservationUserCount();
        this.id=edu.getEduId();
        this.type=r.getReservationType();
    }
}
