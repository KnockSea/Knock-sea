package com.knocksea.see.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder @Entity
@Table(name="product_class")
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(length =10)
    private int classId;

    @Column(nullable = false, length = 300)
    private String classTitle;

    @Column(nullable = false,length = 2000)
    private String classContent;

    @Column(nullable = false, length = 5)
    private int classMaxUser;

    @Builder.Default
    @Column(nullable = false, length = 5)
    private int classCurrentUser=0;

    @Column(nullable = false, length = 7)
    private String classPrice;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ClassLevel classLevel;

    @Column(nullable = true, length = 200)
    private String classService;

    @Column(nullable = false, length = 200)
    private String classFullAddress;

    @Column(nullable = false, length = 500)
    private String classInfo;

    @Column(nullable = false, length = 200)
    private String classLocationInfo;

    @Column(nullable = false, length = 10)
    private int UserId;

    @Column(updatable = false)
    private LocalDateTime createDate;

}