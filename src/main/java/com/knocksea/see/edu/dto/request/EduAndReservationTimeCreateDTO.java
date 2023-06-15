package com.knocksea.see.edu.dto.request;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.entity.EduLevel;
import com.knocksea.see.product.entity.ReservationTime;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
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

    @NotBlank
    @Size(min=1,max = 2000)
    private String eduTitle;

    @NotBlank
    @Size(min=1,max = 200)
    private String eduFullAddress;

    @NotNull
    private int eduPrice;

    @NotNull
    private int timeMaxUser; //예약가능인원 //ReservationTime 엔터티

    @NotNull
    private List<Date> timeDate; //예약일  //ReservationTime 엔터티

    @NotNull
    private List<LocalTime> timeStart; //시작시간  //ReservationTime 엔터티

    @NotNull
    private List<LocalTime> timeEnd;//종료시간  //ReservationTime 엔터티

    @NotBlank
    @Size(min=1,max = 200)
    private String eduService;

    @NotNull
    private EduLevel eduLevel;

    @NotBlank
    @Size(min=1,max = 500)
    private String eduInfo;

    @NotBlank
    @Size(min=1, max = 500)
    private String eduLocationInfo;

    //dto를 entity로 변환
    public Edu toEduEntity(){
        return Edu.builder()
                .eduTitle(this.eduTitle)
                .eduPrice(this.eduPrice)
                .eduLevel(this.eduLevel)
                .eduService(this.eduService)
                .eduFullAddress(this.eduFullAddress)
                .eduInfo(this.eduInfo)
                .eduLocationInfo(this.eduLocationInfo)
                .build();
    }

    /*public ReservationTime toReservationTimeEntity(int i){
        return ReservationTime.builder()
                .timeLabelType("CLASS")
                .timeVerify("Y")
                .timeMaxUser(this.timeMaxUser)
                .timeDate(this.timeDate.get(i))
                .timeStart(this.timeStart)
                .timeEnd(this.timeEnd)
                .build();
    }
*/
}
