package com.knocksea.see.user.repository;

import com.knocksea.see.user.entity.Ship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipRepository extends JpaRepository<Ship, Long> {
}
