package com.knocksea.see.user.entity;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.product.entity.ProductCategory;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "sea_image")
@ToString(exclude = {"ship","spot"})
public class SeaImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long imageId;

    @Column(name = "image_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private ProductCategory imageType;

    @Column(name = "image_name", nullable = false)
    private String imageName;

    @Column(name = "type_number")
    private Long typeNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ship_id")
    private Ship ship;


    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "spot_id")
    private FishingSpot spot;







}
