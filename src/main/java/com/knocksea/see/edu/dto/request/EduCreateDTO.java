package com.knocksea.see.edu.dto.request;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.entity.EduLevel;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

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
public class EduCreateDTO {

    @NotBlank
    @Size(min=1,max = 2000)
    private String eduTitle;

    @NotBlank
    @Size(min=1,max = 200)
    private String eduFullAddress;

    @NotNull
    private int eduPrice;

    @NotNull
    private int timeMaxUser; //reservation_time 엔터티

    @NotNull
    private List<Date> timeDate; //예약일  //reservation_time 엔터티

    @NotNull
    private List<LocalTime> timeStart;//예약 시작시간  //reservation_time 엔터티

    @NotNull
    private List<LocalTime> timeEnd;//예약 종료시간  //reservation_time 엔터티

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
    public Edu toEntity(){
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

}
