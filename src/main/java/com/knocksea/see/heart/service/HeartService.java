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
import java.util.Optional;

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

        Heart existingHeart = null;
        if (product != null) {
            existingHeart = heartRepository.findByUserAndProduct(user, product);
        } else if (edu != null) {
            existingHeart = heartRepository.findByUserAndEdu(user, edu);
        }

        if (existingHeart == null) {
            // 새로운 하트 생성
            Heart heart = dto.toEntity(user, edu, product);
            heartRepository.save(heart);
            return true;
        } else {
            // 기존 하트 삭제
            heartRepository.delete(existingHeart);
            return false;
        }
    }
    public boolean existsByUserAndEduAndHeartType(Long userId, Long eduId, String heartType) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Edu edu = eduRepository.findById(eduId).orElseThrow(() -> new RuntimeException("Edu not found"));
        return heartRepository.existsByUserAndEduAndHeartType(user, edu, HeartType.valueOf(heartType));

    }
    public boolean existsByUserAndProductAndHeartType(Long userId, Long productId, String heartType) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        return heartRepository.existsByUserAndProductAndHeartType(user, product, HeartType.valueOf(heartType));

    }

    public int eduHeart(Long eduId, String heartType) {
        Optional<Edu> eduOptional = eduRepository.findById(eduId);
        Edu edu = eduOptional.orElse(null);

        if (edu == null) {
            return 0;
        }
        int eduHeartCount = heartRepository.countByEduAndHeartType(edu, HeartType.valueOf(heartType));
        return eduHeartCount;
    }
    public int spotAndShipHeart(Long productId, String heartType) {
        Optional<Product> byId = productRepository.findById(productId);
        Product product = byId.orElse(null);

        if (product == null) {
            return 0;
        }
        int productHeartCount = heartRepository.countByProductAndHeartType(product, HeartType.valueOf(heartType));
        return productHeartCount;
    }


}


