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

import javax.transaction.Transactional;
import java.util.Optional;

@SpringBootTest
@Transactional
@Rollback(false)
class AnswerRepositoryTest {

//    @Autowired
//    AnswerRepository answerRepository;

    @Autowired
    InquiryRepository inquiryRepository;

//    @Test
//    @DisplayName("bulk insert")
//    void bulkInsert() {
//        //given
//        for (Long i = 1L; i < 22; i++) {
//            Inquiry inquiry = inquiryRepository.findById(i).orElseThrow();
//
//            answerRepository.save(
//                    Answer.builder()
//                            .answerDetails("답변테스트" + i)
//                            .inquiry(inquiry)
//                            .build()
//            );
//        }
//        //when
//
//        //then
//    }

    @Test
    @DisplayName("dd")
    void fff() {
        Long a = 1L;
        Inquiry inquiry = inquiryRepository.findById(a).orElseThrow();
        System.out.println(inquiry);
    }
}