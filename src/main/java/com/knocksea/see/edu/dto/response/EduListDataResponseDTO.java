package com.knocksea.see.edu.dto.response;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.inquiry.dto.page.PageResponseDTO;
import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EduListDataResponseDTO {

    private Long eduId;
    private String eduTitle;
    private double reviewAverage;
    private String userName;
    private String eduLocation;
    private int eduPrice;
    private String mainImage; //메인 이미지

    private int count; //총게시물 수
    private PageResponseDTO pageInfo; //페이지 렌더링 정보

    public EduListDataResponseDTO(Edu edu) {
        this.eduTitle = edu.getEduTitle();
        this.eduLocation = edu.getEduFullAddress();
        this.eduPrice = edu.getEduPrice();
        this.eduId=edu.getEduId();
    }
}
