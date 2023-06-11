package com.knocksea.see.inquiry.dto.response;

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
public class AnswerListResponseDTO {
    private int count;
    private PageResponseDTO pageInfo;
    private List<InquiryDetailResponseDTO> inquiries;
}
