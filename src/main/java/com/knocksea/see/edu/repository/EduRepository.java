package com.knocksea.see.edu.repository;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface EduRepository extends JpaRepository<Edu,Long> {
    @Query("SELECT e FROM Edu e WHERE e.user = :user")
    List<Edu> findByUser(@Param("user") User user);

    @Query("SELECT e FROM Edu e WHERE e.user = :user")
    Edu findByUserUserId(@Param("user") User user);

    void deleteByEduId(Long eduId);

//    List<Edu> findTop3ByOrderByCreateDate();

    List<Edu> findTop9ByOrderByCreateDateDesc();

    @Query(value = "SELECT r.edu FROM Review r " +
            "GROUP BY r.edu " +
            "ORDER BY AVG(r.reviewRating) DESC")
    List<Edu> findTop4ByReviewRating();

    List<Edu> findAllByStatusValid(String active);

    @Query("SELECT e FROM Edu e WHERE e.user = :user")
    Edu findByUserId(@Param("user") User user);


//    Optional<Edu> findByUserId(User user);
}
