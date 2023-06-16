package com.knocksea.see.edu.dto.response;


import com.knocksea.see.edu.entity.EduLevel;
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
    @NotBlank
    @Size(min = 1, max = 300)
    private String eduTitle;

    @NotBlank
    @Size(min = 1, max = 200)
    private String eduFullAddress;

    @NotNull
    private int eduPrice;

    @NotNull
    private int timeMaxUser;

    //    @DateTimeFormat(pattern = "MM-dd")
    private List<LocalDate> timeDate; //예약일  //ReservationTime 엔터티

    //    @DateTimeFormat(pattern = "'T'HH:mm")
    private List<LocalTime> timeStart; //시작시간  //ReservationTime 엔터티

    //    @DateTimeFormat(pattern = "'T'HH:mm")
    private List<LocalTime> timeEnd;//종료시간  //ReservationTime 엔터티


    @Size(min = 1, max = 200)
    private String eduService;

    @NotNull
    private EduLevel eduLevel;

    @NotBlank
    @Size(min = 1, max = 2000)
    private String eduInfo;

    @NotBlank
    @Size(min = 1, max = 2000)
    private String eduLocationInfo;

    @NotNull
    @Builder.Default
    private Long eduId=0L;
}
