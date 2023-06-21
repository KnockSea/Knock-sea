package com.knocksea.see.edu.dto.response;

import com.knocksea.see.edu.entity.EduLevel;
import lombok.*;

import javax.persistence.Tuple;

@Setter @Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EduTopFourListResponseDTO {
    private int likeCount;

    @Builder.Default
    private Long eduId=0L;

    private String eduFullAddress;

    private EduLevel eduLevel;

    private int eduPrice;

    private String eduTitle;

    private Long userId;



}
