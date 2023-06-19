package com.knocksea.see.heart.repository;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.heart.entity.Heart;
import com.knocksea.see.heart.entity.HeartType;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.TypedQuery;
import java.util.List;

public interface HeartRepository extends JpaRepository<Heart, Long> {
    boolean existsByUserAndHeartTypeAndEduOrProduct(User user, HeartType heartType, Edu edu, Product product);

/*    @Query(value = "SELECT edu_id FROM sea_like GROUP BY edu_id ORDER BY COUNT(edu_id) DESC)", nativeQuery = true)
    TypedQuery<Heart> findLikeRank();*/

    @Query(value = "SELECT edu_id FROM sea_like h GROUP BY edu_id ORDER BY COUNT(edu_id) DESC", nativeQuery = true)
    List<Edu> findLikeRank();
}
