package com.knocksea.see.inquiry.repository;

import com.knocksea.see.inquiry.entity.Answer;
import com.knocksea.see.inquiry.entity.Inquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnswerRepository
    extends JpaRepository<Answer, Long> {

    @Query("SELECT a FROM Answer a WHERE a.inquiry = :inquiry")
    Answer findByInquiry(@Param("inquiry")Inquiry inquiry);
}
