package com.knocksea.see.product.repository;

import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {


//    @Query("SELECT t FROM ReservationTime t WHERE t.product = :product") // @Param("productId")
//    List<ReservationTime> findByProductProductId(Long productId);
    boolean existsByProductTypeAndUserUserId(String productLabelType, Long userId);

    Product findByUserUserId(Long userId);

//    boolean deleteByProductTypeAndProductId(String productType, Long productId);
    @Query("SELECT p FROM Product p WHERE p.user = :user")
    List<Product> findByUser(@Param("user") User user);

    List<Product> findTop9ByProductType(String type);

    List<Product> findAllByStatusValid(String active);

    @Query("SELECT p FROM Product p WHERE p.productType=:type")
    Page<Product> findAllByType(PageRequest pageable, @Param("type") String type);

    @Query("SELECT p FROM Product p WHERE p.user = :user AND p.productType = :type")
    Product findByTargetProduct(@Param("user") User user, @Param("type") String ship);



//    Product findByUserAndType(User user, String type);
}
