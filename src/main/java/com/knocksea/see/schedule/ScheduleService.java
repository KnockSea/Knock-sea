package com.knocksea.see.schedule;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.repository.EduRepository;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.Reservation;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.product.repository.ProductRepository;
import com.knocksea.see.product.repository.ReservationRepository;
import com.knocksea.see.product.repository.ReservationTimeRepository;
import com.knocksea.see.product.repository.ViewProductRepository;
import com.knocksea.see.review.repository.ReviewRepository;
import com.knocksea.see.user.repository.FishingSpotRepository;
import com.knocksea.see.user.repository.ImageRepository;
import com.knocksea.see.user.repository.ShipRepository;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ScheduleService {

//    private final ProductRepository productRepository;
//    private final ReservationTimeRepository reservationTimeRepository;
//    private final ReservationRepository reservationRepository;
//    private final EduRepository eduRepository;
//
//
//    @Scheduled(fixedRate = 600000) // 60000 => 1분
//    public void endProduct() {
////        System.out.println(" 가나다라마바사?");
//        List<Product> productList = productRepository.findAllByStatusValid("ACTIVE");
//        List<Edu> eduList = eduRepository.findAllByStatusValid("ACTIVE");
//
//        if (!productList.isEmpty()) {
////            System.out.println("productList = " + productList);
//            log.warn("스케쥴 프로덕트: {}",productList);
//            productList.forEach(old -> {
////                System.out.println(" 30초 마다 ?");
//                log.info("상품 : {}", old);
//                List<ReservationTime> time = reservationTimeRepository
//                        .findAllByProduct_ProductId(old.getProductId());
//
//                int timer = time.get(time.size() - 1).getTimeStart().compareTo(LocalTime.now());
//                log.warn("타이머 : {}", timer);
//                if (timer < 0) {
//                    old.setStatusValid("INACTIVE");
//                    log.warn("여기 타지?????????????");
//                    productRepository.save(old);
//                    List<Reservation> reserveList
//                            = reservationRepository.findAllByProduct_ProductId(old.getProductId());
//                    if (reserveList != null) {
//                        reserveList.forEach(r -> {
//                            r.setStatusValid("INACTIVE");
//                            reservationRepository.save(r);
//                        });
//                    }
//                    time.forEach(t -> {
//                        t.setStatusValid("INACTIVE");
//                        reservationTimeRepository.save(t);
//                    });
//                }
//
//            });
//        } else {
//            System.out.println("비었네?");
//        }
//
//        if (!eduList.isEmpty()) {
//            eduList.forEach(old -> {
////                System.out.println(" 30초 마다 ?");
//                log.info("상품 : {}", old);
//                List<ReservationTime> time = reservationTimeRepository
//                        .findAllByEdu(old);
//
//                int timer = time.get(time.size() - 1).getTimeStart().compareTo(LocalTime.now());
//                log.warn("타이머 : {}", timer);
//                if (timer < 0) {
//                    old.setStatusValid("INACTIVE");
//                    log.warn("여기 타지?????????????");
//                    eduRepository.save(old);
//                    List<Reservation> reserveList
//                            = reservationRepository.findAllByEdu(old);
//                    if (reserveList != null) {
//                        reserveList.forEach(r -> {
//                            r.setStatusValid("INACTIVE");
//                            reservationRepository.save(r);
//                        });
//                    }
//                    time.forEach(t -> {
//                        t.setStatusValid("INACTIVE");
//                        reservationTimeRepository.save(t);
//                    });
//                }
//
//            });
//        } else {
//            System.out.println(" 얘도 비었네?");
//        }
//    }

}
