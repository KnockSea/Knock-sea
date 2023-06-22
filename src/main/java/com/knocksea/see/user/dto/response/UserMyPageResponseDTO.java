package com.knocksea.see.user.dto.response;

import com.knocksea.see.product.dto.response.ReservationResponseDTO;
import com.knocksea.see.product.entity.Reservation;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.user.entity.User;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Setter
@Getter
@Builder
public class UserMyPageResponseDTO {

    private Long userId;
    private String userName;
    private int userPoint;

    private List<ReservationResponseDTO> reserveDTO;

    public UserMyPageResponseDTO(User user, List<ReservationResponseDTO> reservationTime) {
        this.userId = user.getUserId();
        this.userName = user.getUserName();
        this.userPoint = user.getUserPoint();
        this.reserveDTO = reservationTime;
    }
}
