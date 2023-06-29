package com.knocksea.see.review.repository;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.review.entity.Review;
import com.knocksea.see.review.entity.ReviewType;
import com.knocksea.see.user.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Service;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
class ReviewRepositoryTest {
//    @Autowired
//    ReviewRepository reviewRepository;
//    @Test
//    void saveTest(){
//        Review build = Review.builder()
//                .reviewContent("리뷰입니다1.")
//                .reviewRating(5L)
//                .reviewType(ReviewType.EDU)
//                .edu(Edu.builder()
//                        .eduId(1L)
//                        .build())
//                .user(User.builder()
//                                .userId(1L)
//                                .build())
//                .build();
//
//        reviewRepository.save(build);
//    }
//}

}

