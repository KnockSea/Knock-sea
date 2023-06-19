package com.knocksea.see.product.entity;


import com.knocksea.see.edu.dto.response.EduModifyDTO;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.dto.request.ReservationTimeRequestDTO;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Setter
@Getter
@ToString
@EqualsAndHashCode(of = "timeId")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "sea_reservation_time")
@Entity
public class ReservationTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "time_id")
    private Long timeId;

    private String timeLabelType;
    private LocalDate timeDate;
    private String timeVerify;
    private LocalTime timeStart;
    private LocalTime timeEnd;
    private int timeMaxUser;
    // 한 타임정보에 최대 인원 수만큼 예약을 여러번 받아야 되네?
    @Builder.Default
    private int timeCurrentUser = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "edu_id")
    private Edu edu;

    //수정
    public void update(int i, int j, EduModifyDTO dto) {

        this.timeMaxUser=dto.getTimeMaxUser();
    }

/*    public ReservationTime(ReservationTimeRequestDTO dto) {
        this.timeLabelType = dto.getTimeLabelType();
        // 작성중
    }
*/


}
