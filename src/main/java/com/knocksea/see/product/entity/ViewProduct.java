package com.knocksea.see.product.entity;

import lombok.*;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Immutable
@Setter @Getter
@ToString @EqualsAndHashCode
@Subselect("SELECT product_id, product_location_info, product_full_address FROM sea_product WHERE status_valid = 'ACTIVE'")
@NoArgsConstructor
@AllArgsConstructor
public class ViewProduct {

    @Id
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_location_info")
    private String productLocationInfo;

    @Column(name = "product_full_address")
    private String productFullAddress;


}
