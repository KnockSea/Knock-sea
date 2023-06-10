package com.knocksea.see.repository;

import com.knocksea.see.entity.Ship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipRepository extends JpaRepository<Ship, Long> {
}
