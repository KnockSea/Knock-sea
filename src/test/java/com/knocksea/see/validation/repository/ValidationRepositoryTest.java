package com.knocksea.see.validation.repository;

import com.knocksea.see.product.entity.ProductCategory;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.UserRepository;
import com.knocksea.see.validation.entity.ValidationType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
class ValidationRepositoryTest {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ValidationRepository validationRepository;
    @Test
    @DisplayName("1번 유저가 예약한 타입은 SHIP 타입이어야 한다")
    void validationTest() {
        //given
        User user = userRepository.findById(1L).orElseThrow();
        validationRepository.findByUserAndValidationType(user, ValidationType.SHIP);
        //when

        //then
    }

}
