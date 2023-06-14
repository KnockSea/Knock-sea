package com.knocksea.see.heart.repository;

import com.knocksea.see.heart.entity.Heart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeartRepository extends JpaRepository<Heart, Long> {
}
