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

    public HeartDetailResponseDTO createAndDeleteHeart(Long tokenUserId, HeartCreateDTO dto) {

        Product product = null;
        Edu edu = null;

        if (dto.getProductId() != null) {
            product = productRepository.findById(dto.getProductId()).orElseThrow();
        }

        if (dto.getEduId() != null) {
            edu = eduRepository.findById(dto.getEduId()).orElseThrow();
        }
        User user = userRepository.findById(tokenUserId).orElseThrow();
        Heart saved = null;
        Heart heart = dto.toEntity(user, edu, product);
        Heart heartOrNot = heartRepository.findByUserAndEduAndProduct(user, edu, product);
        if (heartOrNot == null) {
            // 좋아요 추가
            saved = heartRepository.save(heart);
        } else {
            // 좋아요 취소
            heartRepository.delete(heart);
        }
        return new HeartDetailResponseDTO(saved);

    }

    public boolean checkIfLiked(TokenUserInfo userInfo, HeartCreateDTO dto) {
        Product product = null;
        Edu edu = null;

        if (dto.getProductId() != null) {
            product = productRepository.findById(dto.getProductId()).orElseThrow(
                    () -> new EntityNotFoundException("product를 찾을 수 없습니다.")
            );
        }
        if (dto.getEduId() != null) {
            edu = eduRepository.findById(dto.getEduId()).orElseThrow(
                    () -> new EntityNotFoundException("edu를 찾을 수 없습니다.")
            );
        }
        User user = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new EntityNotFoundException("user를 찾을 수 없습니다.")
        );
        Heart heartOrNot = heartRepository.findByUserAndEduAndProduct(user, edu, product);
        System.out.println("좋아요 여부 = "+ heartOrNot);
        return heartOrNot != null;
    }
}



