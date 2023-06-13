package com.knocksea.see.edu.entity;

import com.knocksea.see.user.entity.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Setter
@Getter
@ToString
@EqualsAndHashCode(of = "eduId")
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
    private int eduPrice;

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

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}