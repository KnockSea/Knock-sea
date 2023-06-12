package com.knocksea.see.inquiry.service;

import com.knocksea.see.inquiry.dto.page.PageDTO;
import com.knocksea.see.inquiry.dto.page.PageResponseDTO;
import com.knocksea.see.inquiry.dto.request.AnswerCreateRequestDTO;
import com.knocksea.see.inquiry.dto.response.AnswerDetailResponseDTO;
import com.knocksea.see.inquiry.dto.response.AnswerListResponseDTO;
import com.knocksea.see.inquiry.dto.request.AnswerModifyDTO;
import com.knocksea.see.inquiry.dto.response.InquiryDetailResponseDTO;
import com.knocksea.see.inquiry.entity.Answer;
import com.knocksea.see.inquiry.entity.Inquiry;
import com.knocksea.see.inquiry.repository.AnswerRepository;
import com.knocksea.see.inquiry.repository.InquiryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final InquiryRepository inquiryRepository;


    public AnswerDetailResponseDTO getDetail(Long inquiryId) {
        Answer answer = getAnswer(inquiryId);
        return new AnswerDetailResponseDTO(answer);
    }

    private Answer getAnswer(Long inquiryId) {
        Answer answerEntity = answerRepository.findById(inquiryId)
            .orElseThrow(
                () -> new RuntimeException(
                        inquiryId + "번 문의게시물이 존재하지 않습니다."
                )
            );
        return answerEntity;
    }

    public AnswerDetailResponseDTO insert(final AnswerCreateRequestDTO dto)
        throws RuntimeException {

            Answer saved = answerRepository.save(dto.toEntity());
             log.info("answer saved- {}", saved);

            return new AnswerDetailResponseDTO(saved);

    }

    public AnswerDetailResponseDTO modify(final AnswerModifyDTO dto) {

        final Answer answerEntity = getAnswer(dto.getAnswerId());

        answerEntity.setAnswerDetails(dto.getAnswerDetails());
        Answer modifiedAnswer = answerRepository.save(answerEntity);

        return new AnswerDetailResponseDTO(modifiedAnswer);
    }

    public void delete(Long answerId) throws RuntimeException, SQLException {
        answerRepository.deleteById(answerId);
    }
}
