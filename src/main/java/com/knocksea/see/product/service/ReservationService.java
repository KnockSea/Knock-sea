package com.knocksea.see.product.service;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.repository.EduRepository;
import com.knocksea.see.exception.NoProductException;
import com.knocksea.see.product.dto.request.ReservationRequestDTO;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.ProductCategory;
import com.knocksea.see.product.entity.Reservation;
import com.knocksea.see.product.entity.ReservationTime;
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

    public void createReserve(ReservationRequestDTO dto) throws RuntimeException, NoProductException{
        Reservation reservation = dto.toEntity(dto);
        reservation.setUser(userRepository.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("회원 정보가 없습니다.")));
        reservation.setReservationTime(reservationTimeRepository.findById(dto.getReservationTimeId()).orElseThrow(() -> new RuntimeException("예약 불가능한 시간입니다.")));

        if (dto.getReservationType().equals(ProductCategory.SHIP.toString())) {
            reservation.setProduct(
                    productRepository.findById(dto.getProductId()).orElseThrow(() -> new NoProductException("등록되지 않은 상품입니다."))
            );
        } else if (dto.getReservationType().equals(ProductCategory.EDU.toString())) {
            reservation.setEdu(
                    eduRepository.findById(dto.getEduId()).orElseThrow(() -> new RuntimeException("등록되지 않은 클래스 입니다."))
            );
        }
        Reservation saveReservation = reservationRepository.save(reservation);
        // return new ReservationDetailResponseDTO(saveReservation);
    }

    // 예약 취소
    // 예약한 인원수 빼주고, 결제 정보 취소도 필요해?
    public void cancelReservation(Long ReservationId) {
        Reservation reservation = reservationRepository.findById(ReservationId).orElseThrow(() -> new RuntimeException("예약 정보가 없습니다."));

        // 현재 예약에 신청중인 사람 수
        int reserveCount = reservation.getReservationUserCount();
        ReservationTime reservationTime = reservation.getReservationTime();
        reservationTime.setTimeCurrentUser(reservationTime.getTimeCurrentUser() - reserveCount);

        // 인원수 변동 후 업데이트
        ReservationTime savedTime = reservationTimeRepository.save(reservationTime);

        reservationRepository.deleteById(ReservationId);
    }
}
