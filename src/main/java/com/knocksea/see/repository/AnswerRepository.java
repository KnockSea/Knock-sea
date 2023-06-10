package com.knocksea.see.repository;

import com.knocksea.see.entity.Answer;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnswerRepository
    extends JpaRepository<Answer, Integer> {

    @Query("SELECT DISTINCT a FROM Answer a JOIN FETCH a.employees")
    List<Answer> findAll(PageRequest pageable, int inquiryId);
}
