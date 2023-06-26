package com.knocksea.see.user.repository;

import com.knocksea.see.user.entity.FishingSpot;
import com.knocksea.see.user.entity.User;
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
class FishingSpotRepositoryTest {

    @Autowired
    FishingSpotRepository fishingSpotRepository;

    @Autowired
    UserRepository userRepository;

    /*@Test
    @DisplayName("낚시터 정보가 등록되어야한다")
    void insertFishingspotTest() {
        //given

        User user = userRepository.findByUserEmail("chanho@naver.com").orElseThrow();
        FishingSpot fishingSpot = FishingSpot.builder()
                .spotLocation("경상남도 김해")
                .spotHeartCount(200)
                .spotName("낙동강낚시터")
                .spotDescription("물반 고기반 낙동강 낚시터로 오세요")
                .spotSerialNumber("11-64545535")
                .user(user)
                .build();
        fishingSpotRepository.save(fishingSpot);
        //when

        //then
    }*/

    @Test
    @DisplayName("1번 낚시터의 주인의 이름인 김찬호여야한다")
    void findBynumber() {
        //given
        Long id = 1L;
        FishingSpot fishingSpot = fishingSpotRepository.findById(id).orElseThrow();
        //when
        assertEquals("김찬호",fishingSpot.getUser().getUserName());
        System.out.println("\n\n\n\n\n");
        System.out.println("fishingSpot = " + fishingSpot);
        System.out.println("\n\n\n\n\n");
        System.out.println("fishingSpot.getUser() = " + fishingSpot.getUser());

        //then
    }
}