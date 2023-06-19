package com.knocksea.see.review.repository;

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

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("SELECT r FROM Review r WHERE r.user = :user")
    Page<Review> findByUser (User user, PageRequest pageable);


    List<Review> findAllByProduct(Product product);

}
