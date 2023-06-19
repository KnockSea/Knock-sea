package com.knocksea.see.heart.service;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.repository.EduRepository;
import com.knocksea.see.heart.dto.request.HeartCreateDTO;
import com.knocksea.see.heart.dto.response.HeartDetailResponseDTO;
import com.knocksea.see.heart.entity.Heart;
import com.knocksea.see.heart.entity.HeartType;
import com.knocksea.see.heart.repository.HeartRepository;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.repository.ProductRepository;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class HeartService {

    private final HeartRepository heartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final EduRepository eduRepository;

    public HeartDetailResponseDTO createHeart(Long tokenUserId, HeartCreateDTO dto) {

        User user = userRepository.findById(tokenUserId).orElseThrow();
        Product product = null;
        Edu edu = null;

        if (dto.getProductId() != null) {
            product =  productRepository.findById(dto.getProductId()).orElseThrow();
        }

        if (dto.getEduId() != null) {
            edu = eduRepository.findById(dto.getEduId()).orElseThrow();
        }
        Heart saved = heartRepository.save(dto.toEntity(user, edu, product));

        // 중복 체크

        return new HeartDetailResponseDTO(saved);
    }

    public void deleteHeart(Long heartId) throws RuntimeException, SQLException {
        heartRepository.deleteById(heartId);
    }
}



