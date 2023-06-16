package com.knocksea.see.product.entity;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode(of = "reservationId")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "sea_reservation")
@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long reservationId;

    private String reservationType;

    // 시간값 연결 문자열
//    private String reservationDate;

    private String reservationAddress;

    private int reservationUserCount;

    private int reservationPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "edu_id")
    private Edu edu;

    // 예약 시간
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "time_id", nullable = false)
    private ReservationTime reservationTime;


}
