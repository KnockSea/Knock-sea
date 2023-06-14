package com.knocksea.see.Edu.entity;

import com.knocksea.see.user.entity.User;
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
@Table(name="product_edu")
public class Edu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(length =10)
    private int eduId;

    @Column(nullable = false, length = 300)
    private String eduTitle;

    @Column(nullable = false,length = 2000)
    private String eduContent;

    @Column(nullable = false, length = 5)
    private int eduMaxUser;

    @Builder.Default
    @Column(nullable = false, length = 5)
    private int eduCurrentUser=0;

    @Column(nullable = false, length = 7)
    private String eduPrice;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EduLevel eduLevel;

    @Column(nullable = true, length = 200)
    private String eduService;

    @Column(nullable = false, length = 200)
    private String eduFullAddress;

    @Column(nullable = false, length = 500)
    private String eduInfo;

    @Column(nullable = false, length = 200)
    private String eduLocationInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user")
    private User user;

    @Column(updatable = false)
    private LocalDateTime createDate;

}