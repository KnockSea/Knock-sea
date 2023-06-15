package com.knocksea.see.edu.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.entity.EduLevel;
import lombok.*;


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

    private int eduMaxUser;

    private int eduCurrentUser;

    private String eduService;

    private EduLevel eduLevel;

    private String eduInfo;

    private String eduLocationInfo;


    public EduDetailResponseDTO(Edu edu) {
        this.eduTitle=edu.getEduTitle();
        this.eduFullAddress=edu.getEduFullAddress();
        this.eduPrice=edu.getEduPrice();
        this.eduMaxUser=edu.getEduMaxUser();
        this.eduCurrentUser=edu.getEduCurrentUser();
        this.eduService=edu.getEduService();
        this.eduLevel=edu.getEduLevel();
        this.eduInfo=edu.getEduInfo();
        this.eduLocationInfo=edu.getEduLocationInfo();
    }

}
