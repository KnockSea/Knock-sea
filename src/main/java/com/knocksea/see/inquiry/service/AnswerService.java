package com.knocksea.see.inquiry.service;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.inquiry.dto.page.PageDTO;
import com.knocksea.see.inquiry.dto.page.PageResponseDTO;
import com.knocksea.see.inquiry.dto.request.AnswerCreateRequestDTO;
import com.knocksea.see.inquiry.dto.response.AnswerDetailResponseDTO;
import com.knocksea.see.inquiry.dto.response.AnswerListResponseDTO;
import com.knocksea.see.inquiry.dto.request.AnswerModifyDTO;
import com.knocksea.see.inquiry.entity.Answer;
import com.knocksea.see.inquiry.entity.Inquiry;
import com.knocksea.see.inquiry.repository.AnswerRepository;
import com.knocksea.see.inquiry.repository.InquiryRepository;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final InquiryRepository inquiryRepository;
    private final UserRepository userRepository;

    public AnswerDetailResponseDTO findByInquiry(Long inqyiryId) {

        Inquiry inquiry = inquiryRepository.findById(inqyiryId).orElseThrow(() -> new RuntimeException("없는 문의입니다"));

        Answer answer = answerRepository.findByiId(inquiry);
        AnswerDetailResponseDTO dto = new AnswerDetailResponseDTO(answer);
        log.info("dto - {}", answer);

        return dto;
    }

    private Answer getAnswer(Long answerId) {
        Answer answerEntity = answerRepository.findById(answerId)
                .orElseThrow(
                        () -> new RuntimeException(
                                answerId + "번 문의게시물이 존재하지 않습니다."
                        )
                );
        return answerEntity;
    }

    public AnswerDetailResponseDTO insert(Long inquiryId, final AnswerCreateRequestDTO dto, TokenUserInfo userInfo)
            throws RuntimeException {
        User foundUser = userRepository.findById(userInfo.getUserId()).orElseThrow(
            () -> new RuntimeException("회원 정보가 없습니다.")
        );
        Inquiry inquiryInfo = inquiryRepository.findById(inquiryId).orElseThrow();
        dto.setInquiry(inquiryInfo);

        Answer saved = answerRepository.save(dto.toEntity(foundUser));
        log.info("answer saved- {}", saved);

        return new AnswerDetailResponseDTO(saved);

    }

    public AnswerDetailResponseDTO modify(final AnswerModifyDTO dto, Long userId) {

        final Answer answerEntity = getAnswer(dto.getAnswerId());

        answerEntity.setAnswerDetails(dto.getAnswerDetails());
        Answer modifiedAnswer = answerRepository.save(answerEntity);

        return new AnswerDetailResponseDTO(modifiedAnswer);
    }

    public void delete(Long answerId, Long userId) throws RuntimeException, SQLException {
        Answer byId = answerRepository.findById(answerId).orElseThrow();
        byId.setUser(null);
        answerRepository.save(byId);

        answerRepository.deleteById(answerId);
    }
}