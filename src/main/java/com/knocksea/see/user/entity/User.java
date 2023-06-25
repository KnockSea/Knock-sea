package com.knocksea.see.user.entity;


import com.knocksea.see.inquiry.entity.Inquiry;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.ProductCategory;
import com.knocksea.see.validation.dto.request.validationModifyRequestDTO;
import com.knocksea.see.validation.entity.Validation;
import lombok.*;

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
@Table(name = "sea_user")
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

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_phone", nullable = false)
    private String userPhone;

    @Column(name = "user_address", nullable = false)
    private String userAddress;

    @Column(name = "user_full_address", nullable = false)
    private String userFullAddress;

    @Column(name = "user_grade", nullable = false, columnDefinition = "varchar(20) default 'COMMON'", insertable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private UserGrade userGrade = UserGrade.COMMON;

    @Column(name = "user_point", nullable = true)
    private int userPoint;


    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE)
    private Ship ship;

    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE)
    private FishingSpot fishingSpot;

    //프로필 이미지
    private String profileImg;

    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE)
    private List<Inquiry> inquiries = new ArrayList<>();


    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE)
    private List<Validation> validations = new ArrayList<>();

    //    @OneToMany(mappedBy = "user")
//    @Builder.Default
//    private List<Product> product = new ArrayList<>();

}
