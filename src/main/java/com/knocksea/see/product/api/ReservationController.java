package com.knocksea.see.product.api;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.exception.NoProductException;
import com.knocksea.see.exception.NoneMatchUserException;
import com.knocksea.see.product.dto.request.ReservationCancelDTO;
import com.knocksea.see.product.dto.request.ReservationRequestDTO;
import com.knocksea.see.product.dto.response.ProductDetailResponseDTO;
import com.knocksea.see.product.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
            @Validated @RequestBody ReservationRequestDTO dto, BindingResult result
            , @AuthenticationPrincipal TokenUserInfo userInfo
    ) {
        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest().body(result.getFieldError());
        }
        log.info("/api/v1/reservation POST! - {}", dto);

        try {
            boolean b= reservationService.createReserve(dto,userInfo);
            return ResponseEntity.ok().body(b);

        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> cancelReservation(@Validated @RequestBody ReservationCancelDTO dto
            , BindingResult result
            , @AuthenticationPrincipal TokenUserInfo userInfo
    ) {
        log.info("/api/v1/reservation DELETE! - {}", dto);
        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest().body(result.getFieldError());
        }

        try {
            boolean b = reservationService.cancelReservation(dto, userInfo);
            if (b) {
                log.info("예약 취소에 실패");
                return ResponseEntity.internalServerError().body("예약 취소에 실패하였습니다. \n서버와 통신이 원활하지 않습니다.");
            }
            log.info("reservationService.cancelReservation(dto, userInfo)" + b);
            return ResponseEntity.ok().body("예약이 취소되었습니다.");
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
