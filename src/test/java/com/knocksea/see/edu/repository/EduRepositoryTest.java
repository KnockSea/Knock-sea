package com.knocksea.see.edu.repository;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.entity.UserGrade;
import com.knocksea.see.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalTime;

import static com.knocksea.see.edu.entity.EduLevel.LOWER;
import static com.knocksea.see.edu.entity.EduLevel.MIDDLE;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EduRepositoryTest {

    @Autowired
    EduRepository eduRepository;
    UserRepository userRepository;

  /*  @BeforeEach
        // 테스트 돌리기 전에 실행
    void insertDummyData() {

*//*        //given

        Edu p1 = Edu.builder()
                .eduTitle("초보자 낚시 클래스 모집합니다.")
                .eduPrice(10000)
                .eduLevel(LOWER)
                .eduService("낚시대 대여해드립니다.")
                .eduFullAddress("성내동 518-4번지 B동 1층 강동구 서울특별시")
                .eduInfo("클래스 설명입니다.")
                .eduLocationInfo("클래스 진행하는 장소 소개입니다.")
                .build();
        //when
        Edu saved1=eduRepository.save(p1);*//*


        User user = User.builder()
                .userEmail("aaa@naver.com")
                .userPassword("aaa!")
                .userName("맹구")
                .userPhone("010-1111-1111")
                .userAddress("중앙정보처리학원")
                .userFullAddress("6층")
                .userPoint(0)
                .build();
    }
*/
    @Test
    @DisplayName("클래스 1개를 데이터베이스에 저장해야 한다.")
    void testSave() {

        Edu p2 = Edu.builder()
                .eduTitle("중급자 낚시 클래스 모집합니다.")
                .eduPrice(50000)
                .eduLevel(MIDDLE)
                .eduService("장화 대여가능합니다. 10000원 추가 요금 발생됩니다.")
                .eduFullAddress("서울특별시 송파구 가락동 번지 지하 164-20 1층")
                .eduInfo("클래스 설명입니다.")
                .eduLocationInfo("클래스 진행하는 장소 소개입니다.")
                .build();

        Edu saved = eduRepository.save(p2);

        assertNotNull(saved);
    }

}