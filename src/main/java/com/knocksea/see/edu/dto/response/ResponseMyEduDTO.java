package com.knocksea.see.edu.dto.response;

import com.knocksea.see.edu.entity.Edu;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseMyEduDTO {

    private String userName;

    private String Description;


    private String eduTitle;

    private Enum eduLevel;


    private List<String> eduImageList = new ArrayList<>();

//    public ResponseMyEduDTO(Edu byUserUserId) {
//        this.eduTitle = byUserUserId.getEduTitle();
//        this.Description = byUserUserId.getEduInfo();
//        this.eduLevel = byUserUserId.getEduLevel();
//        this.userName = byUserUserId.getUser().getUserName();
//    }


}
