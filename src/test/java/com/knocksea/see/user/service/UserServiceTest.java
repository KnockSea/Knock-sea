package com.knocksea.see.user.service;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.entity.EduLevel;
import com.knocksea.see.edu.repository.EduRepository;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.entity.UserGrade;
import com.knocksea.see.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static com.knocksea.see.user.entity.UserGrade.COMMON;
import static com.knocksea.see.user.entity.UserGrade.OWNER;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceTest {

    @Autowired
    UserRepository userRepository;
    EduRepository eduRepository;

    @Test
    public void saveUserTest(){
        User saveUser = User.builder()
                .userEmail("aaaa@naver.com")
                .userPassword("aaaa1234!")
                .userName("짱구")
                .userPhone("010-1111-1111")
                .userAddress("마포구")
                .userFullAddress("어쩌고 저쩌고")
                .userGrade(COMMON)
                .userPoint(0)
                .build();

        User saveUser2 = User.builder()
                .userEmail("bbbb@naver.com")
                .userPassword("bbbb1234!")
                .userName("맹구")
                .userPhone("010-1234-1234")
                .userAddress("강남구")
                .userFullAddress("어쩌고 저쩌고")
                .userGrade(COMMON)
                .userPoint(0)
                .build();

        User saveUser3= User.builder()
                .userEmail("cccc@naver.com")
                .userPassword("cccc1234!")
                .userName("바비")
                .userPhone("010-4321-4321")
                .userAddress("청담동")
                .userFullAddress("어쩌고 저쩌고")
                .userGrade(OWNER)
                .userPoint(0)
                .build();

        User saveUser4= User.builder()
                .userEmail("dddd@naver.com")
                .userPassword("dddd1234!")
                .userName("진환")
                .userPhone("010-4321-4321")
                .userAddress("역삼동")
                .userFullAddress("어쩌고 저쩌고")
                .userGrade(OWNER)
                .userPoint(0)
                .build();

        User saveUser5= User.builder()
                .userEmail("eeee@naver.com")
                .userPassword("eeee1234!")
                .userName("동혁")
                .userPhone("010-2222-2222")
                .userAddress("부산")
                .userFullAddress("어쩌고 저쩌고")
                .userGrade(OWNER)
                .userPoint(0)
                .build();

/*        userRepository.save(saveUser);
        userRepository.save(saveUser2);*/
//        userRepository.save(saveUser3);
        userRepository.save(saveUser4);
        userRepository.save(saveUser5);

    }

    @Test
    @DisplayName("클래스 등록")
    void eduInsertTest() {
        //given
        Edu.builder()
                .eduFullAddress("어쩌고저쩌고1")
                .eduInfo("클래스 정보1")
                .eduLevel(EduLevel.MIDDLE)
                .eduLocationInfo("클래스 장소 정보1")
                .eduPrice(50000)
                .eduService("클래스 서비스1")
                .eduTitle("클래스 제목1")
                .build();
        //when

        //then
    }
}