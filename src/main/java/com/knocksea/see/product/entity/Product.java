package com.knocksea.see.product.entity;

import com.knocksea.see.user.entity.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@ToString
@EqualsAndHashCode(of = "productId")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "product")
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_title", nullable = false)
    private String productTitle;

    @Column(name = "product_max_user", nullable = false)
    private int productMaxUser;

    @Column(name = "product_current_user")
    @Builder.Default
    private int productCurrentUser=0;

    @Column(name = "product_price", nullable = false)
    private int productPrice;

    @Column(name = "product_service")
    private String productService;

    @Column(name = "product_full_address", nullable = false)
    private String productFullAddress;

    @Column(name = "product_info", nullable = false)
    private String productInfo;

    @Column(name = "product_location_info", nullable = false)
    private String productLocationInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 예약 시간
    @OneToMany(mappedBy = "product")
    @Builder.Default
    private List<ReservationTime> timeList = new ArrayList<>();


}
