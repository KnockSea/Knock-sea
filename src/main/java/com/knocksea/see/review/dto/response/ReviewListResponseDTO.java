package com.knocksea.see.review.dto.response;

import com.knocksea.see.review.dto.page.PageResponseDTO;
import lombok.*;

import java.util.List;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewListResponseDTO {
    private int count;
    private PageResponseDTO pageInfo;
    private List<ReviewDetailResponseDTO> reviews;
}
