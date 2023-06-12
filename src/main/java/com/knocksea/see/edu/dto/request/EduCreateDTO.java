package com.knocksea.see.edu.dto.request;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.entity.EduLevel;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter @Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EduCreateDTO {

    @NotBlank
    private String userId;

    @NotBlank
    @Size(min=1,max = 2000)
    private String eduTitle;

    @NotBlank
    @Size(min=1,max = 2000)
    private String eduContent;

    @NotBlank
    @Size(min=1,max = 5)
    private int eduMaxUser;

    @NotBlank
//    @Size(min=1,max = 7)
    private int eduPrice;

    @NotBlank
    private EduLevel eduLevel;

    @NotBlank
    @Size(min=1,max = 200)
    private String eduService;

    @NotBlank
    @Size(min=1,max = 200)
    private String eduFullAddress;

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
                .eduContent(this.eduContent)
                .eduMaxUser(this.eduMaxUser)
                .eduPrice(this.eduPrice)
                .eduLevel(this.eduLevel)
                .eduService(this.eduService)
                .eduFullAddress(this.eduFullAddress)
                .eduInfo(this.eduInfo)
                .eduLocationInfo(this.eduLocationInfo)
                .build();
    }

}
