package com.knocksea.see.user.repository;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.product.entity.ProductCategory;
import com.knocksea.see.user.entity.FishingSpot;
import com.knocksea.see.user.entity.SeaImage;
import com.knocksea.see.user.entity.Ship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.util.List;

public interface ImageRepository extends JpaRepository<SeaImage,Long> {

    @Query("SELECT s FROM SeaImage s WHERE s.ship = :ship")
    List<SeaImage> findByShip(@Param("ship") Ship ship);

    @Query("SELECT s FROM SeaImage s WHERE s.spot = :spot")
    List<SeaImage> findBySpot(@Param("spot")  FishingSpot spot);

    void deleteByShip(Ship ship);

    void deleteBySpot(FishingSpot findSpotByUser);

    void deleteByEduEduId(Long eduId);

    void deleteByEdu(Edu edu);
}
