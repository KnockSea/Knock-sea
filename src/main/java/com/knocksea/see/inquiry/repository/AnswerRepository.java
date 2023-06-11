package com.knocksea.see.inquiry.repository;

import com.knocksea.see.inquiry.entity.Answer;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnswerRepository
    extends JpaRepository<Answer, Integer> {

}
