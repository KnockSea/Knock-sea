package com.knocksea.see.product.repository;

import com.knocksea.see.product.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

}