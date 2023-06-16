package com.knocksea.see.user.service;

import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.entity.UserGrade;
import com.knocksea.see.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static com.knocksea.see.user.entity.UserGrade.COMMON;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceTest {

    @Autowired
    UserRepository userRepository;

    @Test
    public void saveUserTest(){
        User saveUser = User.builder()
                .userEmail("aaa@naver.com")
                .userPassword("aaaa1234!")
                .userName("맹구")
                .userPhone("010-1234-1234")
                .userAddress("강남구")
                .userFullAddress("어쩌고 저쩌고")
                .userGrade(COMMON)
                .userPoint(0)
                .build();

        userRepository.save(saveUser);

    }
}