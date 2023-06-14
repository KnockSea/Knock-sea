package com.knocksea.see.edu.entity;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder @Entity
@Table(name="sea_like")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
    @Column(length =10)
    private int heartId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private LikeType heartType;

    @Column(nullable = false, length = 10)
    private int userId;

    @Column(nullable = false, length = 10)
    private int productId;

    @Column(nullable = false, length = 10)
    private int classId;

}