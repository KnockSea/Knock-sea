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
    boolean existsByUserAndEduOrProduct(User user, Edu edu, Product product);


/*    @Query(value = "SELECT edu_id FROM sea_like GROUP BY edu_id ORDER BY COUNT(edu_id) DESC)", nativeQuery = true)
    TypedQuery<Heart> findLikeRank();*/

    @Query(value = "SELECT edu_id FROM sea_like h GROUP BY edu_id ORDER BY COUNT(edu_id) DESC LIMIT 0, 4", nativeQuery = true)
    List<Edu> findLikeRank();

    //제품으로 좋아요 리스트 뽑아오는 기능
    @Query("SELECT h FROM Heart h WHERE h.product = :product")
    List<Heart> findByProduct(Product product);


    boolean existsByUserAndHeartType(User user, HeartType heartType);
}
