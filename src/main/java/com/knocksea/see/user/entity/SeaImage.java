package com.knocksea.see.user.entity;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.product.entity.ProductCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "sea_image")
public class SeaImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long imageId;

    @Column(name = "image_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private ProductCategory imageType;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ship_id")
    private Ship ship;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "spot_id")
    private FishingSpot spot;





}
