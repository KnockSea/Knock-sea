package com.knocksea.see.user.repository;

import com.knocksea.see.user.entity.Ship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipRepository extends JpaRepository<Ship, Long> {

    //유저 등록된 배 찾기
    Ship findByUserUserId(Long userId);

}
