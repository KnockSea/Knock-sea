package com.knocksea.see.product.repository;

import com.knocksea.see.edu.entity.Edu;

import com.knocksea.see.product.entity.Product;

import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import java.util.Optional;

public interface ReservationTimeRepository extends JpaRepository<ReservationTime, Long> {

    void deleteByEduEduId(long eduId);

    void deleteByEdu(Edu edu);

    List<ReservationTime> findAllByEdu(Edu edu);

    Optional<Object> findByEduEduId(Edu edu);

    int countByEdu(Edu edu);

    List<ReservationTime> findAllByProduct(Product product);

    int deleteByProductProductId(Long productId);

    int countByProduct(Product product);

    List<ReservationTime> findAllByProduct_ProductId(Long productId);

//    Optional<ReservationTime> findByUser(User user);
}
