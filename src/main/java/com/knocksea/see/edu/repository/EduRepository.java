package com.knocksea.see.edu.repository;

import com.knocksea.see.edu.entity.Edu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface EduRepository extends JpaRepository<Edu,Integer> {
}
