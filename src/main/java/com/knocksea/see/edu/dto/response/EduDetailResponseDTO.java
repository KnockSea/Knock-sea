package com.knocksea.see.edu.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.entity.EduLevel;
import com.knocksea.see.product.entity.ReservationTime;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;


@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EduDetailResponseDTO {

    private String eduTitle;

    private String eduFullAddress;

    private int eduPrice;

    private int timeMaxUser; //예약가능인원

    private String timeLabelType;

    private String timeVerify;

    private List<LocalDate> timeDate; //예약일

    private List<LocalTime> timeStart; //시작시간

    private List<LocalTime> timeEnd;//종료시간

    private String eduService;

    private EduLevel eduLevel;

    private String eduInfo;

    private String eduLocationInfo;


    public EduDetailResponseDTO(Edu saveEdu, List<ReservationTime> timeList) {
        timeDate = new ArrayList<>();
        timeStart = new ArrayList<>();
        timeEnd = new ArrayList<>();
        this.eduTitle=saveEdu.getEduTitle();
        this.eduFullAddress=saveEdu.getEduFullAddress();
        this.eduPrice=saveEdu.getEduPrice();
        this.eduService=saveEdu.getEduService();
        this.eduLevel=saveEdu.getEduLevel();
        this.eduInfo=saveEdu.getEduInfo();
        this.eduLocationInfo=saveEdu.getEduLocationInfo();
        this.timeLabelType=timeList.get(0).getTimeLabelType();
        this.timeVerify=timeList.get(0).getTimeVerify();
        this.timeMaxUser=timeList.get(0).getTimeMaxUser();

        for (int i = 0; i < timeList.size(); i++) {
            this.timeDate.add(timeList.get(i).getTimeDate());
        }
        for (int i = 0; i < timeList.size(); i++) {
            this.timeStart.add(timeList.get(i).getTimeStart());
        }
        for (int i = 0; i < timeList.size(); i++) {
            this.timeEnd.add(timeList.get(i).getTimeEnd());
        }

    }

}
