package com.knocksea.see.product.api;

import com.knocksea.see.product.dto.request.ReservationCancelDTO;
import com.knocksea.see.product.dto.request.ReservationRequestDTO;
import com.knocksea.see.product.dto.response.ProductDetailResponseDTO;
import com.knocksea.see.product.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/reservation")
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<?> createReservation(
            @Validated @RequestBody ReservationRequestDTO dto, BindingResult result) {
        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest().body(result.getFieldError());
        }
        log.info("/api/v1/reservation POST! - {}", dto);

        ProductDetailResponseDTO reserve = reservationService.createReserve(dto);
        return ResponseEntity.ok().body(reserve);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> cancelReservation(@Validated @RequestBody ReservationCancelDTO dto, BindingResult result) {

        log.info("/api/v1/reservation DELETE! - {}", dto);

        boolean flag = reservationService.cancelReservation(dto);

        if (flag) {
            return ResponseEntity.internalServerError().body("예약 취소에 실패하였습니다.");
        }
        return ResponseEntity.ok().body("예약이 취소되었습니다.");
    }

}
