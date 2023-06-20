package com.knocksea.see.user.entity;


import com.knocksea.see.product.entity.ProductCategory;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Builder
@Entity
@ToString(exclude = {"user","images"})
@Table(name = "sea_fishing_spot")
public class FishingSpot {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "spot_id")
    private Long spotId;

    @Column(name = "spot_name", nullable = false)
    private String spotName;

    @Column(name = "spot_location", nullable = false)
    private String spotLocation;

    @Column(name = "spot_description", nullable = false)
    private String spotDescription;

    @Column(name = "spot_serial_number", nullable = false)
    private String spotSerialNumber;

    @Column(name = "spot_heart_count", nullable = false, columnDefinition = "int default 0")
    private int spotHeartCount;

    @Column(name = "product_category" )
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ProductCategory productCategory = ProductCategory.SPOT;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "spot", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SeaImage> images = new ArrayList<>();

}
