package com.knocksea.see.validation.repository;

import com.knocksea.see.user.entity.User;
import com.knocksea.see.validation.entity.Validation;
import com.knocksea.see.validation.entity.ValidationStatus;
import com.knocksea.see.validation.entity.ValidationType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ValidationRepository extends JpaRepository<Validation,Long> {


    //등록된 검증정보 찾기
    @Query("SELECT sv FROM Validation sv WHERE sv.user = :user AND sv.validationType = :validationType")
    Validation findByUserAndValidationType(@Param("user")User user, @Param("validationType")ValidationType validationType);

    List<Validation> findByValidationType(ValidationType validationType);

//    Validation findByUser_UserId(Long userId);
//    @Query("SELECT v FROM Validation v WHERE v.validationType = :validationType AND v.validationStatus = 'WAIT'")
//    Page<Validation> findByValidationTypeAndValidationStatus(@Param("validationType") ValidationType validationType, Pageable pageable);

    @Query("SELECT p FROM Validation p WHERE p.validationType = :validationType AND p.validationStatus = :status")
    Page<Validation> findAllByTypeAndStatus(PageRequest pageable, @Param("validationType") ValidationType validationType, @Param("status") ValidationStatus validationStatus);



}
