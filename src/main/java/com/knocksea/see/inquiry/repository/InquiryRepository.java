package com.knocksea.see.inquiry.repository;

import com.knocksea.see.inquiry.entity.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface InquiryRepository extends JpaRepository<Inquiry, Long>{
    @Query("SELECT a FROM Inquiry a WHERE a.inquiryId = :inquiryId")
    Inquiry findByInquiry(@Param("inquiryId")Long inquiryId);
}
