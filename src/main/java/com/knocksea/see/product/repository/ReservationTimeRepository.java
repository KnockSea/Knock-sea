package com.knocksea.see.product.repository;

import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.ReservationTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationTimeRepository extends JpaRepository<ReservationTime, Long> {

    List<ReservationTime> findAllByProduct(Product product);


    boolean deleteByProductId(Long productId);
}
