package com.knocksea.see.review.repository;

import com.knocksea.see.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByUserId (Long UserId, PageRequest pageable);
}
