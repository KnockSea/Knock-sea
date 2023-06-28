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
import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import javax.persistence.EntityNotFoundException;
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

    public boolean createAndDeleteHeart(HeartCreateDTO dto) {

        Product product = null;
        Edu edu = null;

        if (dto.getProductId() != null) {
            product = productRepository.findById(dto.getProductId()).orElseThrow();
        }

        if (dto.getEduId() != null) {
            edu = eduRepository.findById(dto.getEduId()).orElseThrow();
        }
        User user = userRepository.findById(dto.getUserId()).orElseThrow();
        Heart saved = null;
        boolean heartOrNot = heartRepository.existsByUserAndHeartType(user, HeartType.valueOf(dto.getHeartType()));
        if (!heartOrNot) {
            // 좋아요 추가
            Heart heart = dto.toEntity(user, edu, product);
            saved = heartRepository.save(heart);

        } else {
            // 좋아요 취소
            Heart heart = heartRepository.existsByUserAndHeartType1(user, HeartType.valueOf(dto.getHeartType()));
            log.info("heart @@@@@@@@@@@@@@@@@ - {}", heart);
            heartRepository.deleteById(heart.getHeartId());
        }
        return !heartOrNot;
    }
    public boolean existsByUserAndHeartType(Long userId, String heartType) {
        User user = userRepository.findById(userId).orElseThrow();
        return heartRepository.existsByUserAndHeartType(user, HeartType.valueOf(heartType));
    }

}


