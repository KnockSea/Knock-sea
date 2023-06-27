package com.knocksea.see.product.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.Reservation;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.user.entity.SeaImage;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationResponseDTO {

    private String imgUrl;
    @JsonFormat(pattern = "yyyy년 MM월 dd일")
    private LocalDateTime reserveDate;
    private String reserveTitle;
    private int reservePrice;

    public ReservationResponseDTO(Reservation r, ReservationTime time, Product product, SeaImage img) {
        this.imgUrl = img.getImageName();
        this.reserveDate = r.getReservationDate();
        this.reserveTitle = product.getProductTitle();
        this.reservePrice = r.getReservationPrice();
    }

    public ReservationResponseDTO(Reservation r, ReservationTime time, Edu edu, SeaImage img) {
        this.imgUrl = img.getImageName();
        this.reserveDate = r.getReservationDate();
        this.reserveTitle = edu.getEduTitle();
        this.reservePrice = r.getReservationPrice();
    }
}
