package com.knocksea.see.product.repository;

import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(false)
class ProductRepositoryTest {

    @Autowired
    ProductRepository productRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    ReservationTimeRepository reservationTimeRepository;

//    @Test
//    @DisplayName("상품객체 생성이 되어야 한다")
//    void makeProduct() {
//
//        //given
//        User u = User.builder()
//                .userEmail("bbb@test.com")
//                .userName("순구순구")
//                .userBirth(LocalDate.now())
//                .userAddress("강원도 어딘가요")
//                .userFullAddress("강원도 어딘가 어디 어디항")
//                .userPassword("1234")
//                .userPhone("010-1000-2000")
//                .build();
//        User save = userRepository.save(u);

//        Product product = Product.builder()
//                .productTitle("바다낚시 갈솨람")
//                .productMaxUser(10)
//                .productPrice(500000)
//                .productService("미끼 지급, 낚시대 지원")
//                .productFullAddress("강원도 어딘가")
//                .productInfo("강원도 배낚시 최고")
//                .productLocationInfo("강원도 어딘가 무슨항에 오시면 됩니다")
//                .user(u)
//                .build();
//
//        //when
//
//        Product save = productRepository.save(product);
//
//        //then
//        assertEquals("강원도 어딘가", save.getProductFullAddress());
//    }

    @Test
    @DisplayName("1번 유저가 상품을 등록할때 예약 가능시간 테이블에도 값이들어가야 한다")
    void rTimeTest() {
        //given
        Long id = 1L;
        //when
        User user = userRepository.findById(id).get();

        Product product = Product.builder()
                .productTitle("222바다낚시 갈솨람")
//                .productMaxUser(10)
                .productPrice(500000)
                .productService("미끼 지급, 낚시대 지원")
                .productFullAddress("강원도 어딘가")
                .productInfo("강원도 배낚시 최고")
                .productLocationInfo("강원도 어딘가 무슨항에 오시면 됩니다")
                .user(user)
                .build();

        Product saved = productRepository.save(product);

        ReservationTime t1 = ReservationTime.builder()
                .timeLabelType("배")
                .timeVerify("N")
                .timeDate(LocalDate.of(2023, 6, 20))
                .timeStart(LocalTime.of(8, 30))
                .timeEnd(LocalTime.of(12, 0))
                .product(saved)
                .build();
        ReservationTime t2 = ReservationTime.builder()
                .timeLabelType("배")
                .timeVerify("N")
                .timeDate(LocalDate.of(2023, 6, 20))
                .timeStart(LocalTime.of(12, 00))
                .timeEnd(LocalTime.of(18, 0))
                .product(saved)
                .build();

        reservationTimeRepository.save(t1);
        ReservationTime time = reservationTimeRepository.save(t2);
        //then
        assertEquals("N", time.getTimeVerify());
    }

}