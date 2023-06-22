package com.knocksea.see.product.repository;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.product.entity.Reservation;
import com.knocksea.see.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {


    Optional<Reservation> findByEduEduId(Edu edu);

    int countByEdu(Edu edu);

    boolean existsByProductProductTypeAndProductProductId(String productLabelType, Long productId);

    Optional<Reservation> findByProductProductId(Long productId);

//    @Query("SELECT u FROM Reservation u WHERE u.user = :userId")
    List<Reservation> findAllByUserUserId(Long userId);
}
