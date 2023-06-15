package com.knocksea.see.heart.entity;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = {"heartId"})
@Builder
@Table(name = "sea_like")
@Entity
public class Heart {

    @Id
    @Column(name = "heart_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long heartId;

    @Enumerated(EnumType.STRING)
    @Column(name = "heart_type", nullable = false)
    private HeartType heartType;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "edu_id")
    private Edu edu;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private Product product;

}
