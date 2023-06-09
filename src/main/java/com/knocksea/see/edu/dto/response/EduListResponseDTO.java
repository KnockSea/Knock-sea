package com.knocksea.see.edu.dto.response;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.inquiry.dto.page.PageResponseDTO;
import lombok.*;

import java.util.List;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EduListResponseDTO {

    private int totalCount; //총게시물 수

    private PageResponseDTO pageInfo; //페이지 렌더링 정보
    
    private List<EduListDataResponseDTO> posts;//게시물 렌더링 정보

    private List<EduListDataResponseDTO> topFour; //평점 탑포

}
