package com.knocksea.see.edu.entity;

import com.knocksea.see.edu.dto.request.EduAndReservationTimeCreateDTO;
import com.knocksea.see.edu.dto.response.EduModifyDTO;
import com.knocksea.see.heart.entity.Heart;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.review.entity.Review;
import com.knocksea.see.user.entity.SeaImage;
import com.knocksea.see.user.entity.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@ToString(exclude={"reviews"})
@EqualsAndHashCode(of = "eduId")
@NoArgsConstructor
@AllArgsConstructor
@Builder @Entity
@Table(name="sea_product_edu")
public class Edu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(length =10)
    private Long eduId;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createDate;

    @Column(nullable = false, length = 300)
    private String eduTitle;

    @Column(nullable = false, length = 200)
    private String eduFullAddress;

    @Column(nullable = false, length = 7)
    private int eduPrice;

    @Column(nullable = true, length = 200)
    private String eduService;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private EduLevel eduLevel = EduLevel.LOWER;


    @Column(nullable = false, length = 2000)
    private String eduInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

/*  @OneToMany(mappedBy = "edu", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Heart> like = new ArrayList<>();

    @OneToMany(mappedBy = "edu", fetch = FetchType.LAZY)
    @Builder.Default
    private List<ReservationTime> reservationTime = new ArrayList<>();*/

    @OneToMany(mappedBy = "edu", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Review> reviews = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id")
    private SeaImage seaImage;


    // 수정메서드
    public void update(EduAndReservationTimeCreateDTO dto) {
        this.eduTitle = dto.getEduTitle();
        this.eduFullAddress=dto.getEduFullAddress();
        this.eduPrice=dto.getEduPrice();
        this.eduService=dto.getEduService();
        this.eduLevel=dto.getEduLevel();
        this.eduInfo=dto.getEduInfo();
    }

}