package com.knocksea.see.heart.service;

import com.knocksea.see.edu.repository.EduRepository;
import com.knocksea.see.heart.dto.request.HeartCreateDTO;
import com.knocksea.see.heart.dto.response.HeartDetailResponseDTO;
import com.knocksea.see.heart.entity.Heart;
import com.knocksea.see.heart.entity.HeartType;
import com.knocksea.see.heart.repository.HeartRepository;
import com.knocksea.see.product.repository.ProductRepository;
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

    public HeartDetailResponseDTO createHeart(HeartCreateDTO heartDTO) {

        // 중복 체크: 유저와 타입, 클래스 또는 제품 ID를 기준으로 이미 좋아요를 한 경우
        boolean isDuplicateHeart = heartRepository.existsByUserAndHeartTypeAndEduOrProduct(
                userRepository.findById(heartDTO.getUser().getUserId()).orElseThrow(() -> new IllegalArgumentException("User not found")),
                HeartType.valueOf(heartDTO.getHeartType()),
                heartDTO.getEdu(),
                heartDTO.getProduct()
        );

        if (isDuplicateHeart) {
            throw new IllegalArgumentException("Duplicate heart"); // 중복된 좋아요인 경우 예외 처리
        }

        Heart saved = heartRepository.save(heartDTO.toEntity());

        return new HeartDetailResponseDTO(saved);
    }

    public void deleteHeart(Long heartId) throws RuntimeException, SQLException {
        heartRepository.deleteById(heartId);
    }
}



