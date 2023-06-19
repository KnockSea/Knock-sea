package com.knocksea.see.inquiry.repository;

import com.knocksea.see.inquiry.entity.Inquiry;
import com.knocksea.see.review.dto.page.PageDTO;
import com.knocksea.see.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface InquiryRepository extends JpaRepository<Inquiry, Long>{
    @Query("SELECT a FROM Inquiry a WHERE a.inquiryId = :inquiryId")
    Inquiry findByInquiry(@Param("inquiryId")Long inquiryId);

    @Query("SELECT i FROM Inquiry i WHERE i.user = :user")
    Page<Inquiry> findByUser(@Param("user") User user, Pageable pageable);
}
