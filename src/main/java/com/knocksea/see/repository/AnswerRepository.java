package com.knocksea.see.repository;

import com.knocksea.see.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository
    extends JpaRepository<Answer, Integer> {
}
