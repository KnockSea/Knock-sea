package com.knocksea.see.product.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

public class Pay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payId;
    private String payInfo;
    private Long payAmount;
    private LocalDateTime payDate;
    private String payMethod;
//    @ManyToOne
//    @JoinColumn(name = "reservation_id",cascade = CascadeType.REMOVE)
//    private Reservation reservation;

}
