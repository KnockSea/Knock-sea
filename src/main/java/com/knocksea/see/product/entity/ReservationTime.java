package com.knocksea.see.product.entity;

import com.knocksea.see.Edu.entity.Edu;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Setter
@Getter
@ToString
@EqualsAndHashCode(of = "timeId")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "reservation_time")
@Entity
public class ReservationTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "time_id")
    private Long timeId;

    private String timeLabelType;
    private LocalDateTime timeDate;
    private String timeCheck;
    private LocalDateTime timeStart;
    private LocalDateTime timeEnd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "edu_id")
    private Edu edu;

}
