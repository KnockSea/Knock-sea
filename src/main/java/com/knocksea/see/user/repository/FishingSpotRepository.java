package com.knocksea.see.user.repository;

import com.knocksea.see.user.entity.FishingSpot;
import com.knocksea.see.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FishingSpotRepository extends JpaRepository<FishingSpot,Long> {

    @Query("SELECT fs FROM FishingSpot fs WHERE fs.user = :user")
    FishingSpot findByUser(@Param("user") User user);
}
