package com.knocksea.see.edu.dto.request;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.entity.EduLevel;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.user.entity.User;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Getter @Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Slf4j
public class EduAndReservationTimeCreateDTO {

    private String eduTitle;

    private String eduFullAddress;

    private int eduPrice;

    private int timeMaxUser; //예약가능인원 //ReservationTime 엔터티

    private List<LocalDate> timeDate; //예약일  //ReservationTime 엔터티

    private List<LocalTime> timeStart; //시작시간  //ReservationTime 엔터티

    private List<LocalTime> timeEnd;//종료시간  //ReservationTime 엔터티

    private String eduService;

    private EduLevel eduLevel;

    private String eduInfo;

//    private Long userId;

    //dto를 entity로 변환
    public Edu toEduEntity(User user){
        return Edu.builder()
                .eduTitle(this.eduTitle)
                .eduPrice(this.eduPrice)
                .eduLevel(this.eduLevel)
                .eduService(this.eduService)
                .eduFullAddress(this.eduFullAddress)
                .eduInfo(this.eduInfo)
                .user(user)
                .build();
    }

    public ReservationTime toReservationTimeEntity(int i, int j,Edu edu){

        return ReservationTime.builder()
                .timeLabelType("CLASS")
                .timeVerify("Y")
                .timeMaxUser(this.timeMaxUser)
                .timeDate(this.timeDate.get(i))
                .timeStart(this.timeStart.get(j))
                .timeEnd(this.timeEnd.get(j))
                .edu(edu)
                .build();
    }
}