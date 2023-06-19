package com.knocksea.see.user.repository;

import com.knocksea.see.user.entity.Ship;
import com.knocksea.see.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ShipRepository extends JpaRepository<Ship, Long> {

    //유저 등록된 배 찾기
    @Query("SELECT s FROM Ship s WHERE s.user = :user")
    Ship findByUser(@Param("user") User user);

}
