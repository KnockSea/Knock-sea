package com.knocksea.see.product.repository;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.product.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Optional<Reservation> findByEduEduId(Edu edu);
}
