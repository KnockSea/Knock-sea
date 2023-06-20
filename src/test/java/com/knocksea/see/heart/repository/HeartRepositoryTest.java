package com.knocksea.see.heart.repository;

import com.knocksea.see.heart.entity.HeartType;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.UserRepository;
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
class HeartRepositoryTest {

    @Autowired
    HeartRepository heartRepository;

    @Autowired
    UserRepository userRepository;

    @Test
    @DisplayName("fff")
    void test() {
        //given
        Long id = 2L;
        User user = userRepository.findById(id).orElseThrow();
        //when
        boolean b = heartRepository.existsByUserAndHeartType(user, HeartType.SPOT);
//        existsByUserAndHeartType(User user, HeartType heartType)
        //then
        assertTrue(b);
    }
}