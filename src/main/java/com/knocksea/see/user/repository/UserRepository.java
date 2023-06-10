package com.knocksea.see.user.repository;

import com.knocksea.see.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {


    // 이메일로 회원정보 조회
    Optional<User> findByUserEmail(String email);

    //이메일 중복체크
    boolean existsByUserEmail(String userEmail);

    //이메일로 회원정보 얻는 함수
}
