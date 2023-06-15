package com.knocksea.see.product.repository;

import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.ReservationTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT t FROM ReservationTime t WHERE t.product = :product")
    List<ReservationTime> findByProductId(@Param("product") Product product);
}
