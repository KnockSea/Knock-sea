package com.knocksea.see.product.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@ToString
@EqualsAndHashCode(of = "categoryId")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "sea_product_category")
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int categoryId;

    @Enumerated(EnumType.STRING)
    private ProductCategory categoryType;
}
