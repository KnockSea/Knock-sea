package com.knocksea.see.review.service;

import com.knocksea.see.product.repository.ProductRepository;
import com.knocksea.see.review.dto.page.PageDTO;
import com.knocksea.see.review.dto.page.PageResponseDTO;
import com.knocksea.see.review.dto.request.ReviewCreateDTO;
import com.knocksea.see.review.dto.response.ReviewDetailResponseDTO;
import com.knocksea.see.review.dto.response.ReviewListResponseDTO;
import com.knocksea.see.review.entity.Review;
import com.knocksea.see.review.repository.ReviewRepository;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;



  public ReviewDetailResponseDTO insert(final ReviewCreateDTO dto)
    throws RuntimeException {
      Review saved = reviewRepository.save(dto.toEntity());

      return new ReviewDetailResponseDTO(saved);

  }


}
