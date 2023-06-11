package com.knocksea.see.repository;

import com.knocksea.see.inquiry.entity.Answer;
import com.knocksea.see.inquiry.repository.AnswerRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;

@SpringBootTest
@Transactional
@Rollback(value = false)
class AnswerRepositoryTest {

    @Autowired
    AnswerRepository answerRepository;

    @Test
    @DisplayName("bulk insert")
    void bulkInsert() {
        //given
        for (int i = 1; i < 21; i++) {
            answerRepository.save(
                    Answer.builder()
                            .answerDetails("답변테스트" + i)
                            .userId(i)
                            .inquiryId(i)
                            .build()
            );
        }
        //when

        //then
    }
}