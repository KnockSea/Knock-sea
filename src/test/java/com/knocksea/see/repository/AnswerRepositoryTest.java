package com.knocksea.see.repository;

import com.knocksea.see.entity.Answer;
import com.knocksea.see.entity.Inquiry;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;

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
        for (int i = 1; i < 10; i++) {
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