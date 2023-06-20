package com.knocksea.see.edu.dto.response;

import com.knocksea.see.edu.entity.Edu;
import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EduListDataResponseDTO {

    private String eduTitle;
    private double reviewAverage;
    private String userName;
    private String eduLocation;
    private int eduPrice;

    public EduListDataResponseDTO(Edu edu) {
        this.eduTitle = edu.getEduTitle();
        this.eduLocation = edu.getEduLocationInfo();
        this.eduPrice = edu.getEduPrice();
    }
}
