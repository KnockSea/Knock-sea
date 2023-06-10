package com.knocksea.see.service;

import com.knocksea.see.dto.page.PageDTO;
import com.knocksea.see.dto.response.AnswerListResponseDTO;
import com.knocksea.see.repository.AnswerRepository;
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

        answerRepository.findAll(pageable, inquiryId);
    }
}
