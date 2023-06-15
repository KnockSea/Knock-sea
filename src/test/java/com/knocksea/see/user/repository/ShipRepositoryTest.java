package com.knocksea.see.user.repository;

import com.knocksea.see.user.entity.Ship;
import com.knocksea.see.user.entity.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

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
        User user = userRepository.findById(1L).orElseThrow();

        System.out.println("user = " + user);
        Ship shipsample = Ship.builder()
                .shipDescription("고기가 잘잡히는 우리배타보셔요")
                .shipLocation("전라남도 나주시")
                .shipSerial("11-9546256")
                .shipName("갈치호")
                .shipLikeCount(2000)
                .user(user) // Set the user field with a valid User object
                .build();

        //when
        shipRepository.save(shipsample);
    }
    @Test
    @DisplayName("userid로 배 정보를 가져와야한다")
    void findshipuserid() {
        //given
        Long id = 1L;
        //when
        Ship byUserId = shipRepository.findByUserUserId(id);
        //then

        System.out.println("byUserId = " + byUserId);

        System.out.println("byUserId.getUser() = " + byUserId.getUser());
    }

//    @Test
//    @DisplayName("배 정보를 수정해야한다")
//    void shipInfoModifyTest() {
//        //given
//        Long id = 2L;
//        //when
//        Ship byUserId = shipRepository.findByUserUserId(id);
//        //then
//        byUserId.setShipDescription("고기 개잘잡힙니다");
//        byUserId.setShipLocation("경남 남해");
//        byUserId.setShipSerial("44-6666666");
//        byUserId.setShipName("거북선");
//
//        Ship save = shipRepository.save(byUserId);
//
//        System.out.println("save = " + save);
//        System.out.println("\n\n\n\n\n\n\n");
////        System.out.println("save.getUser() = " + save.getUser());
//
//
//        //when
//
//
//        //then
//    }
}