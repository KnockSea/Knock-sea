package com.knocksea.see.product.repository;

import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.Reservation;
import com.knocksea.see.product.entity.ReservationTime;
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
@Rollback(false)
class ReservationRepositoryTest {

    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ReservationTimeRepository reservationTimeRepository;


    @Test
    @DisplayName("예약에 성공하면 예약 가능 시간 컬럼의 해당 값이 Y으로 바뀌어야 한다")
    void makeReserve() {
        //given
        int BASE_PRICE = 50000;
        Product product = productRepository.findById(2L).get();
//        if(productRepository.findById(2L).isPresent()){
//            Product product = productRepository.findById(2L).get();
//            System.out.println("product = " + product);
//        } else {
//            System.out.println("씨발 왜 안나오냐고");
//        }
//
        User user = userRepository.findById(1L).get();
        System.out.println("user = " + user);
        ReservationTime time = reservationTimeRepository.findById(3L).get();

        Reservation reserve = Reservation.builder()
                .reservationType("ship")
                .reservationDate("날짜: " + time.getTimeDate() + "/시간: " + time.getTimeStart() + ":" + time.getTimeEnd())
                .reservationAddress("집합장소")
//                .reservationUserCount(2)
                .reservationPrice(product.getProductPrice() * BASE_PRICE)
                .reservationTime(time)
                .user(user)
                .product(product)
                .build();

        Reservation saveReserve = reservationRepository.save(reserve);

//        product.setProductMaxUser(product.getProductMaxUser() - saveReserve.getReservationUserCount());
        Product p1 = productRepository.save(product);
        time.setTimeVerify("Y");
        ReservationTime p2 = reservationTimeRepository.save(time);


//        assertEquals(8, p1.getProductMaxUser());
//         assertEquals("Y", p2.getTimeVerify());


        //when

        //then
    }

}