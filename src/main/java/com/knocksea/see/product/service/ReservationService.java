package com.knocksea.see.product.service;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.edu.repository.EduRepository;
import com.knocksea.see.exception.NoProductException;
import com.knocksea.see.product.dto.request.ReservationCancelDTO;
import com.knocksea.see.product.dto.request.ReservationRequestDTO;
import com.knocksea.see.product.entity.ProductCategory;
import com.knocksea.see.product.entity.Reservation;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.product.repository.ProductDetailService;
import com.knocksea.see.product.repository.ProductRepository;
import com.knocksea.see.product.repository.ReservationRepository;
import com.knocksea.see.product.repository.ReservationTimeRepository;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final EduRepository eduRepository;
    private final ReservationTimeRepository reservationTimeRepository;
    private final ProductDetailService productDetailService;

    public boolean createReserve(ReservationRequestDTO dto, TokenUserInfo userInfo) throws RuntimeException, NoProductException{
        log.info("dto UserId : "+dto.getUserId());

        Reservation reservation = dto.toEntity(dto);
        log.info("reservation ㅎㅎ: "+reservation);

        User user = userRepository.findById(userInfo.getUserId()).orElseThrow(() -> new RuntimeException("회원 정보가 없습니다."));
        log.info("reservation user: "+user.getUserName());

        reservation.setUser(user);
        log.info("setUser reservation: "+reservation);

//        productRepository.findById(dto.getProductId());

        ReservationTime reservationTime = reservationTimeRepository.findById(dto.getReservationTimeId())
                .orElseThrow(() -> new RuntimeException("예약 상품이 존재하지 않습니다."));
        reservation.setReservationTime(reservationTime);
        log.info("setReservationTime reservation: "+reservationTime);

        if ((reservationTime.getTimeCurrentUser() + dto.getReservationUserCount()) > reservationTime.getTimeMaxUser()) {
            throw new RuntimeException("예약 가능 인원이 초과하였습니다.");
        }

        // 신청 인원 수 변경
        int reserveCount = dto.getReservationUserCount();// 신청 유저 숫자
        reservationTime.setTimeCurrentUser(reservationTime.getTimeCurrentUser() + reserveCount);
        reservationTimeRepository.save(reservationTime); // 예약 인원 수 만큼 현재 신청인원 수 증가 (예약 가능 시간 테이블 업데이트)


        if (dto.getReservationType().equals(ProductCategory.SHIP.toString()) || dto.getReservationType().equals(ProductCategory.SPOT.toString()) ) {
            reservation.setProduct(
                    productRepository.findById(dto.getProductId()).orElseThrow(() -> new NoProductException("등록되지 않은 상품입니다."))
            );
        } else if (dto.getReservationType().equals(ProductCategory.EDU.toString())) {
            reservation.setEdu(
                    eduRepository.findById(dto.getEduId()).orElseThrow(() -> new RuntimeException("등록되지 않은 클래스 입니다."))
            );
        }
        // 여기서 결제 까지 해야되네 (메서드 빼서 결제 하자)


        Reservation saveReservation = reservationRepository.save(reservation); // 마지막에 예약 등록

        if(saveReservation!=null) return true;
        else return false;

    }

    // 예약 취소
    // 예약한 인원수 빼주고, 결제 정보 취소도 필요해?
    public boolean cancelReservation(ReservationCancelDTO dto, TokenUserInfo userInfo) throws RuntimeException {
        Reservation reservation = reservationRepository.findById(dto.getReservationId()).orElseThrow(() -> new RuntimeException("예약 정보가 없습니다."));
        log.info("reservation : "+reservation);
        log.info("dto : "+dto.getReservationId());
        if (!reservation.getUser().getUserId().equals(userInfo.getUserId())) {
            throw new RuntimeException("본인의 예약만 취소할 수 있습니다.");
        }

        // 현재 예약에 신청중인 사람 수
        int reserveCount = reservation.getReservationUserCount();
        log.info("reserveCount : "+reserveCount);
        ReservationTime reservationTime = reservation.getReservationTime();
        log.info("reservationTime : "+reservationTime);

        reservationTime.setTimeCurrentUser(reservationTime.getTimeCurrentUser() - reserveCount);

        // 인원수 변동 후 업데이트
        ReservationTime savedTime = reservationTimeRepository.save(reservationTime);
        log.info("savedTime : "+savedTime);

        reservationRepository.deleteById(dto.getReservationId());
        log.info("deleteById");

        return reservationRepository.findById(dto.getReservationId()).isPresent();
    }
}
