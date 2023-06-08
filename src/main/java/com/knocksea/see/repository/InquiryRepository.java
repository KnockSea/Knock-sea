package com.knocksea.see.repository;

import com.knocksea.see.entity.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InquiryRepository
    extends JpaRepository<Inquiry, Integer> {

}
