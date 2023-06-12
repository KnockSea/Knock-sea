package com.knocksea.see.user.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.knocksea.see.product.entity.Product;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Builder
@Entity
@ToString(exclude = "ship")
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Email
    @Column(name = "user_email", unique = true, nullable = false)
    private String userEmail;

    @Column(name = "user_password", nullable = false)
    private String userPassword;

    @JsonFormat(pattern="yyyy-MM-dd")
    @Column(name = "user_birth", nullable = false)
    private LocalDate userBirth;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_phone", nullable = false)
    private String userPhone;

    @Column(name = "user_address", nullable = false)
    private String userAddress;

    @Column(name = "user_full_address", nullable = false)
    private String userFullAddress;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'COMMON'") // enum은 반드시 '' 로 감싸야함
    private UserGrade userGrade;

    @Column(name = "user_point", nullable = true)
    private int userPoint;

    @Column(name = "user_image", nullable = true)
    private String userImage;


    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Ship ship;

    @OneToMany(mappedBy = "user")
    @Builder.Default
    private List<Product> product = new ArrayList<>();




}
