package com.knocksea.see.edu.dto.request;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.entity.EduLevel;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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
    private int eduMaxUser;

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
