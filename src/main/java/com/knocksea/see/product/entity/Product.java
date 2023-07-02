package com.knocksea.see.product.entity;

import com.knocksea.see.user.entity.SeaImage;
import com.knocksea.see.user.entity.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@ToString
@EqualsAndHashCode(of = "productId")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "sea_product")
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_title", nullable = false)
    private String productTitle;

//    @Column(name = "product_max_user", nullable = false)
//    private int productMaxUser;
//      // 예약 시간 정보 테이블로 넘어갔음
//    @Column(name = "product_current_user")
//    @Builder.Default
//    private int productCurrentUser=0;

    // 1인당 금액
    @Column(name = "product_price", nullable = false)
    private int productPrice;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime productInputDate;

    @Column(name = "product_service")
    private String productService;

    @Column(name = "product_full_address", nullable = false)
    private String productFullAddress; // 상세 주소 ( 몇동 몇호 )

    @Column(name = "product_info", nullable = false, length = 2000)
    private String productInfo;


    @Column(name = "product_location_info", nullable = false)
    private String productLocationInfo; // 주소 입력 받는 곳 ( 주소 폼 )

    private String productType;

//    @Builder.Default
//    private int maxUser = 1;

    // 활성화 , 비활성화 컬럼 (Y, N) 등
    @Builder.Default
    private String statusValid = "ACTIVE";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "category_id")
//    private Category category;

    // 예약 시간 양방향 관리 할거면 필요한데...
//    @OneToMany(mappedBy = "product")
//    @Builder.Default
//    private List<ReservationTime> timeList = new ArrayList<>();

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "image_id")
//    private SeaImage seaImage;
}
