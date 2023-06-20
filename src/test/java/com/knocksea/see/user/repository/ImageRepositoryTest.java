package com.knocksea.see.user.repository;

import com.knocksea.see.user.entity.SeaImage;
import com.knocksea.see.user.entity.Ship;
import com.knocksea.see.user.entity.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@Transactional
@Rollback(value = false)
class ImageRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ShipRepository shipRepository;

    @Autowired
    ImageRepository imageRepository;


    @Test
    @DisplayName("1번배의 사진이 전부 삭제되어야한다")
    void deleteByShipTest() {

        User.builder().build();
        //given
        User user = userRepository.findById(1L).orElseThrow(()->{
            throw new RuntimeException("해당유저가 존재하지않습니다");
        });
        //when
        Ship findByUser = shipRepository.findByUser(user);

        imageRepository.deleteByShip(findByUser);

        List<SeaImage> byShip = imageRepository.findByShip(findByUser);

        System.out.println("byShip = " + byShip);
        //then
    }
}