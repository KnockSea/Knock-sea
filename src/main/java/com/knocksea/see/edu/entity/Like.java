//package com.knocksea.see.edu.entity;
//
//import com.knocksea.see.product.entity.Product;
//import com.knocksea.see.user.entity.User;
//import lombok.*;
//
//import javax.persistence.*;
//
//@Setter
//@Getter
//@ToString
//@EqualsAndHashCode
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder @Entity
//@Table(name="sea_like")
//public class Like {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
//    @Column(length =10)
//    private int heartId;
//
//    @Column(nullable = false)
//    @Enumerated(EnumType.STRING)
//    private LikeType heartType;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "edu_id")
//    private Edu edu;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "productId")
//    private Product product;
//
//}