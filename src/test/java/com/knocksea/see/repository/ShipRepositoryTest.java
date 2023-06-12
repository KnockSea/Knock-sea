package com.knocksea.see.repository;

import com.knocksea.see.entity.Ship;
import com.knocksea.see.entity.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

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
    @DisplayName("2번유저의 배가 등록되어야한다")
    void insertBoatTest() {
        Long id = 2L;

        User user = userRepository.findById(id).orElseThrow();
        System.out.println("user = " + user);
        Ship shipsample = Ship.builder()
                .shipDescription("고기가 잘잡히는 우리배타보셔요")
                .shipLocation("전라남도 나주시")
                .shipSerial("11-9546256")
                .shipName("갈치호")
                .shipLikeCount(2000)
                .user(user)
                .build();

        //when
        shipRepository.save(shipsample);

    }
    @Test
    @DisplayName("1번배의 배주인의 이름은 장지환이어야한다")
    void findByBoatNumber() {
        //given
        Ship ship = shipRepository.findById(1L).orElseThrow();

        User user = ship.getUser();

        //when
        System.out.println("ship = " + ship.getUser().getUserId());
        System.out.println("\n\n\n\n");
        System.out.println("user = " + user);
        //then
        assertEquals("장지환",user.getUserName());
    }
}