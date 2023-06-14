package com.knocksea.see.review.dto.response;

import com.knocksea.see.inquiry.dto.page.PageResponseDTO;
import com.knocksea.see.inquiry.dto.response.InquiryDetailResponseDTO;
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
    private List<ReviewDetailResponseDTO> inquiries;
}
