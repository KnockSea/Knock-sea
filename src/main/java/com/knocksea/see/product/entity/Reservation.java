package com.knocksea.see.product.entity;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.entity.EduLevel;
import com.knocksea.see.user.entity.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    @CreationTimestamp
    private LocalDateTime reservationDate; // 예약 등록한 시간
    private String reservationAddress;
    private int reservationUserCount;
    private int reservationPrice;
    @Builder.Default
    private String statusValid = "ACTIVE";


//    @ManyToOne(fetch = FetchType.LAZY)
    @Builder.Default
    private EduLevel eduLevel = EduLevel.LOWER;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "edu_id")
    private Edu edu;

    // 예약 시간
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "time_id", nullable = false)
    private ReservationTime reservationTime;


}
