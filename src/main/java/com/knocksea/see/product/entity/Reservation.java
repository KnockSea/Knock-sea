package com.knocksea.see.product.entity;

import com.knocksea.see.user.entity.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@ToString
@EqualsAndHashCode(of = "reservationId")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "reservation")
@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long reservationId;

    private String reservationType;

    private LocalDate reservationDate;

    private LocalDateTime reservationTime;

    private String reservationAddress;

    private int reservationUserCount;

    private int reservationPrice;

//    @ManyToOne
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "product_id")
//    private Product product;



}
