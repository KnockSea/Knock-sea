package com.knocksea.see.edu.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.entity.EduLevel;
import com.knocksea.see.product.dto.response.ReservationTimeResponseDTO;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.review.dto.response.ReviewDetailResponseDTO;
import com.knocksea.see.user.entity.SeaImage;
import com.knocksea.see.user.entity.User;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EduDetailResponseDTO {

    private Long eduId;

    private String eduTitle;

    private String eduFullAddress;

    private int eduPrice;

    private String eduService;

    private EduLevel eduLevel;

    private String eduInfo;

    private List<ReservationTimeResponseDTO> timeList;

    private List<ReviewDetailResponseDTO> reviewList;

    private List<String> imageList;

    private Long userId;
    private String userName;

    private String userProfileImage;
    private String statusValid;


/*    public EduDetailResponseDTO(Edu saveEdu, List<ReservationTime> timeList) {

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
    }*/

    public EduDetailResponseDTO(Edu edu, List<ReservationTimeResponseDTO> timeList, List<ReviewDetailResponseDTO> reviews, List<String> images) {
        this.eduTitle = edu.getEduTitle();
        this.eduFullAddress = edu.getEduFullAddress();
        this.eduPrice = edu.getEduPrice();
        this.eduService = edu.getEduService();
        this.eduLevel = edu.getEduLevel();
        this.eduInfo = edu.getEduInfo();
        this.timeList = timeList;
        this.reviewList = reviews;
        this.imageList = images;
        this.eduId=edu.getEduId();
        this.userId = edu.getUser().getUserId();
        this.userName = edu.getUser().getUserName();
        this.userProfileImage=edu.getUser().getProfileImg();
        this.statusValid = edu.getStatusValid();
    }
}
