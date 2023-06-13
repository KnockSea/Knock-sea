package com.knocksea.see.user.repository;

import com.knocksea.see.user.entity.Ship;
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
class ShipRepositoryTest {
    
    @Autowired
    ShipRepository shipRepository;

    @Autowired
    UserRepository userRepository;

    @Test
    @DisplayName("배를 저장해야한다")
    void insertShipTest() {
        User user = userRepository.findByUserEmail("chanho@naver.com").orElseThrow();
        //given
        Ship build = Ship.builder()
                .shipSerial("11-45625665")
                .shipLocation("새벽 롤망호 파티구함")
                .shipName("롤망호").shipLocation("경상남도 남해")
                .shipLikeCount(0)
                .user(user)
                .build();
        //when
        shipRepository.save(build);

        //then
    }
//    @Test
//    @DisplayName("userid로 배 정보를 가져와야한다")
//    void findshipuserid() {
//        //given
//        Long id = 1L;
//        //when
//        Ship byUserId = shipRepository.findByUserId(id);
//        //then
//
//        System.out.println("byUserId = " + byUserId);
//    }
}