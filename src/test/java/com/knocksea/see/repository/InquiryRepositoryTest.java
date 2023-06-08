package com.knocksea.see.repository;

import com.knocksea.see.entity.Inquiry;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
class InquiryRepositoryTest {

    @Autowired
    InquiryRepository inquiryRepository;

    @Test
    @DisplayName("bulk insert")
    void bulkInsert() {
        //given
        for (int i = 0; i < 10; i++) {
            inquiryRepository.save(
                            Inquiry.builder()
                                    .inquiryDetails("테스트" + i)
                                    .build()
            );
        }
        //when

        //then
    }
}