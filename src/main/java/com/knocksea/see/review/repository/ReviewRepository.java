package com.knocksea.see.review.repository;


import com.knocksea.see.edu.entity.Edu;

import com.knocksea.see.product.entity.Product;

import com.knocksea.see.review.entity.Review;
import com.knocksea.see.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import java.util.List;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("SELECT r FROM Review r WHERE r.user = :user")
    Page<Review> findByUser (@Param("user") User user, PageRequest pageable);


//    @Query("SELECT r FROM Review r WHERE r.edu = :edu")
    List<Review> findAllByEdu(Edu edu);
    List<Review> findAllByProduct(Product product);
    @Query("SELECT r FROM Review r WHERE r.product = :product")
    List<Review> findByProduct(@Param("product") Product product);

    List<Review> findAllByUser(User user);

    @Query("SELECT r.reviewId FROM Review r WHERE r.user = :user")
    List<Long> findReviewIdByUser(@Param("user") User user); //user가 작성한 reviewId 찾기

//    List<Long> findEduIdByUser(User user);

    @Query("SELECT DISTINCT r.edu.eduId FROM Review r WHERE r.user.userId = :userId")
    List<Long> findEduIdByUserId(@Param("userId") Long userId);

    @Query("SELECT DISTINCT r.product.productId FROM Review r WHERE r.user.userId = :userId")
    List<Long> findProductIdByUserId(@Param("userId")Long userId);

//    List<Long> findProductIdByUser(User user);
}
