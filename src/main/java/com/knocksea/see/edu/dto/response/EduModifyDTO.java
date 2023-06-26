package com.knocksea.see.edu.dto.response;


import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.entity.EduLevel;
import com.knocksea.see.product.entity.ReservationTime;
import com.sun.istack.NotNull;
import lombok.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EduModifyDTO {

    @Builder.Default
    private Long eduId=0L;

    private String eduTitle;

    private String eduFullAddress;

    private int eduPrice;

    private int timeMaxUser;  //ReservationTime 엔터티

    private List<LocalDate> timeDate; //예약일  //ReservationTime 엔터티

    //    @DateTimeFormat(pattern = "'T'HH:mm")
    private List<LocalTime> timeStart; //시작시간  //ReservationTime 엔터티

    //    @DateTimeFormat(pattern = "'T'HH:mm")
    private List<LocalTime> timeEnd;//종료시간  //ReservationTime 엔터티

    private String eduService;

    private EduLevel eduLevel;

    private String eduInfo;

    private String eduLocationInfo;

    private Long userId;

    public ReservationTime toReservationTimeEntity(int i, int j, Edu edu){

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
