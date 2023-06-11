package com.knocksea.see.inquiry.service;

import com.knocksea.see.inquiry.dto.page.PageDTO;
import com.knocksea.see.inquiry.dto.response.AnswerListResponseDTO;
import com.knocksea.see.inquiry.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class AnswerService {

    private final AnswerRepository answerRepository;

    public AnswerListResponseDTO getAnswers(PageDTO dto, int inquiryId) {
        PageRequest pageable = PageRequest.of(
                dto.getPage() - 1,
                dto.getSize(),
                Sort.by("answerDateTime").descending()
        );

        return null;
    }
}
