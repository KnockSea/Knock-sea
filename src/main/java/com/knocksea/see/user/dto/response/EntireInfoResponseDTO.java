package com.knocksea.see.user.dto.response;


import com.knocksea.see.heart.entity.Heart;
import com.knocksea.see.review.entity.Review;
import com.knocksea.see.user.entity.Ship;
import lombok.*;
import org.hibernate.procedure.spi.ParameterRegistrationImplementor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
@Setter
@Getter
public class EntireInfoResponseDTO {

    //배에 관련된 리뷰리스트
    private List<Review> shipReviewList;

    //낚시터에 관련된 리뷰 리스트
    private List<Review> spotReviewList;

    //클래스에 관련된 리뷰 리스트
    private List<Review> eduReviewList;


    //배에 관련된 총 평점 평균
    private int shipReviewAvgScore;

    //낚시터에 관련된 총 평점 평균
    private int spotReviewAvgScore;

    //클래스에 관련된 총 평점 평균
    private int eduReviewAvgScore;

    //선박에 관련된 좋아요 리스트
    private List<Heart> heartListShip;

    //낚시터에 관련된 좋아요 리스트
    private List<Heart> heartListSpot;

    //클래스에 관련된 좋아요 리스트
    private List<Heart> heartListEdu;


}
