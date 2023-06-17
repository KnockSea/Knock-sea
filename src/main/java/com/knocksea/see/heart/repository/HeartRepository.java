package com.knocksea.see.heart.repository;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.heart.entity.Heart;
import com.knocksea.see.heart.entity.HeartType;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HeartRepository extends JpaRepository<Heart, Long> {
    boolean existsByUserAndHeartTypeAndEduOrProduct(User user, HeartType heartType, Edu edu, Product product);

    //제품으로 좋아요 리스트 뽑아오는 기능
    @Query("SELECT h FROM Heart h WHERE h.product = :product")
    List<Heart> findByProduct(Product product);
}
