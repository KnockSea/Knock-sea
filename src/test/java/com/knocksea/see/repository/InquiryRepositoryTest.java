package com.knocksea.see.repository;

import com.knocksea.see.inquiry.entity.Answer;
import com.knocksea.see.inquiry.entity.Inquiry;
import com.knocksea.see.inquiry.repository.AnswerRepository;
import com.knocksea.see.inquiry.repository.InquiryRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Rollback(value = false)
class InquiryRepositoryTest {

    @Autowired
    InquiryRepository inquiryRepository;

    @Autowired
    AnswerRepository answerRepository;

    @Test
    @DisplayName("bulk insert")
    void bulkInsert() {
        //given
        for (Long i = 1L; i < 22; i++) {
            inquiryRepository.save(
                            Inquiry.builder()
                                    .inquiryDetails("테스트 게시글 " + i)
                                    .inquiryId(i)
                                    .userId(i)
                                    .build()
            );
        }
        //when

        //then
    }

//    @Test
//    @DisplayName("dd")
//    void dd() {
//        //given
//        Inquiry inquiry = inquiryRepository.findById(1L).orElseThrow();
//
//        Answer answer = answerRepository.save(
//                Answer.builder()
//                        .answerDetails("답변입니다")
//                        .inquiry(inquiry)
//                        .build()
//        );
//        //when
//        Answer answer1 = inquiry.getAnswer();
//        System.out.println(answer1);
//
//        //then
//    }
}