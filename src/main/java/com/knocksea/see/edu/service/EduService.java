package com.knocksea.see.edu.service;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.edu.dto.request.EduAndReservationTimeCreateDTO;
import com.knocksea.see.edu.dto.response.*;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.repository.EduRepository;
import com.knocksea.see.heart.repository.HeartRepository;
import com.knocksea.see.inquiry.dto.page.PageDTO;
import com.knocksea.see.inquiry.dto.page.PageResponseDTO;
import com.knocksea.see.product.dto.response.ReservationTimeResponseDTO;
import com.knocksea.see.product.dto.response.mainListResponseDTO;
import com.knocksea.see.product.entity.Reservation;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.product.repository.ReservationRepository;
import com.knocksea.see.product.repository.ReservationTimeRepository;
import com.knocksea.see.review.dto.response.ReviewDetailResponseDTO;
import com.knocksea.see.review.entity.Review;
import com.knocksea.see.review.repository.ReviewRepository;
import com.knocksea.see.user.entity.SeaImage;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.ImageRepository;
import com.knocksea.see.user.repository.UserRepository;
import com.knocksea.see.user.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class EduService {

    private final EduRepository eduRepository;
    private final ReservationTimeRepository reservationTimeRepository;
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;
    private final ReviewRepository reviewRepository;
    private final HeartRepository heartRepository;
    public List<ReservationTime> timeList;
    private final ImageRepository imageRepository;
    private final ImageService imageService;


//    private final S3Client s3Client;

    @Value("${aws.bucketName}")
    private String bucketName;


    //좋아요 상위 4개 조회
    public EduTopFourListResponseDTO findTopFour(){
        log.info("gggg");
        //정 안되면 Edu 테이블에 좋아요 칼럼 만들기
        //리뷰테이블에서 평점이 높은 topFour를 찾아서 그 eduId를 찾음. eduId로 edu테이블에서 찾음
// List<Long> eduTopFourList = eduRepository.findTop4ByReviewRating();
        return null;
    }

    //전체 조회
    public EduListResponseDTO getAllEdu(PageDTO dto) {
        //유저이름, 리뷰 평점, 위치, 가격, 제목
        //User,heart
        //Pageable 객체 생성
        Pageable pageable = PageRequest.of(
                dto.getPage()-1,
                dto.getSize(),
                Sort.by("createDate").descending()
        );

        //데이터베이스에서 게시물 목록 조회
        Page<Edu> allEdu = eduRepository.findAll(pageable);

        List<Edu> content = allEdu.getContent();
        log.info("content : "+content);

        List<Edu> top4ByReviewRating = eduRepository.findTop4ByReviewRating();

        List<EduListDataResponseDTO> list = content.stream().map( edu -> {
            return getEduListDataResponseDTO(edu);
        }).collect(Collectors.toList());

        List<EduListDataResponseDTO> topFourList = top4ByReviewRating.stream().map( edu -> {
            return getEduListDataResponseDTO(edu);
        }).collect(Collectors.toList());

        return EduListResponseDTO.builder()
                .totalCount(list.size())
                .posts(list)
                .topFour(topFourList)
                .pageInfo(new PageResponseDTO(allEdu))
                .build();
    }

    private EduListDataResponseDTO getEduListDataResponseDTO(Edu edu) {
        EduListDataResponseDTO edus = new EduListDataResponseDTO(edu);
        double reviewTotal = 0;
        User user = userRepository.findById(edu.getUser().getUserId()).get();

        edus.setUserName(user.getUserName());
        List<Review> reviews = edu.getReviews();

        for (Review review : reviews) {
            reviewTotal += review.getReviewRating();
        }

        double reviewAverage = reviewTotal / reviews.size();
        reviewAverage= Math.round(reviewAverage * 10)/10.0; //소수점 한자리만 나오도록

        int front = (int) reviewAverage;
        log.info("front : "+front);
        double back = reviewAverage%1;
        log.info("back : "+back);

        if (back >= 0.0 && back <= 0.4) {
            reviewAverage = front+0.0;
        } else if(back >= 0.5 && back <= 0.9){
            reviewAverage = front+0.5;
        }
        log.info("reviewAverage : "+reviewAverage);

        if(reviewAverage>0) {
            edus.setReviewAverage(reviewAverage);
        }else {
            edus.setReviewAverage(0);
        }
        List<SeaImage> mainImage = imageRepository.findAllByEdu(edu);

        mainImage.forEach(seaImage -> {
            String imageName = seaImage.getImageName();
            edus.setMainImage(imageName);
        });
        return edus;
    }

    // 상품 상세조회 기능 (예약 가능 시간 정보 포함)
    //이미지 찾아와야 함
    public EduDetailResponseDTO getDetail(Long eduId) {
      Edu edu = getEdu(eduId);
      log.info("edu : "+edu);
        // 예약 가능 시간 목록(상품번호로 조회)
        List<ReservationTimeResponseDTO> timeResponseDTOList = reservationTimeRepository.findAllByEdu(edu).stream()
                .map(ReservationTimeResponseDTO::new).collect(Collectors.toList());
        log.info("timeResponseDTOList : "+timeResponseDTOList);

         // 리뷰 목록(상품번호로 조회)  // null 뜨는지 확인해야댐
        List<ReviewDetailResponseDTO> reviewResponseList = reviewRepository.findAllByEdu(edu).stream()
                .map(review -> {
                            ReviewDetailResponseDTO reviewDetailResponseDTO = new ReviewDetailResponseDTO();
                            reviewDetailResponseDTO.setReviewId(review.getReviewId());
                            reviewDetailResponseDTO.setReviewContent(review.getReviewContent());
                            reviewDetailResponseDTO.setReviewRating(review.getReviewRating());
                            reviewDetailResponseDTO.setReviewType(review.getReviewType());
                            reviewDetailResponseDTO.setEduId(review.getEdu().getEduId());
                            reviewDetailResponseDTO.setReviewRating(review.getReviewRating());
                            reviewDetailResponseDTO.setInquiryDateTime(review.getInquiryDateTime());
                            reviewDetailResponseDTO.setProfileImg(review.getUser().getProfileImg());
                            reviewDetailResponseDTO.setUserName(review.getUser().getUserName());
                            reviewDetailResponseDTO.setReviewRating(review.getReviewRating());
                            return reviewDetailResponseDTO;
                        }
                        ).collect(Collectors.toList());
        log.info("reviewResponseList : "+reviewResponseList);

        List<String> imgUrls = new ArrayList<>();
        imageRepository.findAllByEdu(edu).forEach( i -> {
            imgUrls.add(i.getImageName());
            log.info("images : "+i.getImageName());
        });

        return new EduDetailResponseDTO(edu, timeResponseDTOList, reviewResponseList,imgUrls);
    }


    //클래스 저장
    public EduDetailResponseDTO insert(final EduAndReservationTimeCreateDTO dto, TokenUserInfo userInfo) throws RuntimeException{
        //유저 정보는 토큰을 이용해서 저장. 토큰하기 전까지만 이렇게
        User user = userRepository.findById(userInfo.getUserId())
                .orElseThrow(() -> new RuntimeException("존재하지 않은 회원입니다."));

        if (eduRepository.findByUserUserId(user)!=null){
            throw new RuntimeException("이미 등록한 클래스가 있습니다.");
        }

        log.warn("이거 되면 안되는데?");
        //Edu 엔터티랑 ReservationTime엔터티에 저장
        //entity로 변환해서 저장
        Edu saveEdu = eduRepository.save(dto.toEduEntity(user));

        //등록한 예약시간 개수만큼 save하면 됨.
        for (int i = 0; i < dto.getTimeDate().size(); i++) {
            for (int j = 0; j < dto.getTimeStart().size(); j++) {
                ReservationTime savereservationTime
                        = reservationTimeRepository.save(dto.toReservationTimeEntity(i, j, saveEdu));
            }
        }

        return getDetail(saveEdu.getEduId());
    }

    //클래스 수정
    public EduDetailResponseDTO modify(EduAndReservationTimeCreateDTO dto, TokenUserInfo userInfo, List<MultipartFile> eduImg) throws RuntimeException, IOException {

        User user = userRepository.findById(userInfo.getUserId())
                .orElseThrow(() -> new RuntimeException("유저 없음"));

        Edu edu = eduRepository.findByUserUserId(user);

        //만약에 time_current_user가 1명 이상이면 수정못하도록
        int reservationCount = reservationRepository.countByEdu(edu);
        if(reservationCount>0){
            throw new RuntimeException("신청 인원이 한명 이상이므로 수정할 수 없음");
        }

        //ReservationTime 아예 삭제시키고 다시 등록시킴
         reservationTimeRepository.deleteByEduEduId(edu.getEduId());
         imageRepository.deleteByEduEduId(edu.getEduId());

        //수정한 예약시간 개수만큼 save
        for (int i = 0; i < dto.getTimeDate().size(); i++) {
            for (int j = 0; j < dto.getTimeStart().size(); j++) {
                ReservationTime savereservationTime
                        = reservationTimeRepository.save(dto.toReservationTimeEntity(i, j, edu));
            }
        }


        //이미지 다시 저장
        imageService.saveEduImg(eduImg,userInfo);

        edu.update(dto);
        eduRepository.save(edu);
        return getDetail(edu.getEduId());
    }

    private Edu getEdu(Long eduId){
        return eduRepository.findById(eduId)
                .orElseThrow(
                        () -> new RuntimeException(
                                eduId + "번 게시물이 존재하지 않습니다!"
                        )
                );
    }

    private Optional<Reservation> getReservationTime(Edu edu){
        Optional<Reservation> byEduEduId = reservationRepository.findById(edu.getEduId());
        if(byEduEduId!=null){
            log.info("ㅎㅎㅎㅎㅎ");
            return reservationRepository.findByEduEduId(edu);
        }else {
            throw new RuntimeException("서버 쨍그랑");
        }
    }

    //삭제
    public void delete(Long eduId) throws RuntimeException{
        //삭제시 user테이블의 데이터까지 같이 삭제됨 -> 수정해야 함

        Edu edu = getEdu(eduId);

        log.info("delete edu : "+edu);
        int i = reservationRepository.countByEdu(edu);
        //만약에 예약한 인원이 1명 이상이면 삭제하지 못하도록
        if (edu != null && i > 0) {
            throw new RuntimeException("예약이 존재하여 삭제할 수 없습니다.");
        } else {
           log.info("삭제중!! "+i);
            imageRepository.deleteByEdu(edu);
            reservationTimeRepository.deleteByEduEduId(eduId);
            log.info("reservationTime 삭제 : ");
            eduRepository.deleteByEduId(eduId);
        }
    }

    public List<mainListResponseDTO> eduMainList() {
        List<Edu> eduList = eduRepository.findTop9ByOrderByCreateDateDesc();

        return eduList.stream()

                .map(e -> {
                    List<SeaImage> seaImage = imageRepository.findAllByEdu(e);
//                            .orElseThrow(() -> new RuntimeException("이미지정보가 잘못 되었습니다."));
                    return new mainListResponseDTO(e, seaImage.get(0));
                }).collect(Collectors.toList());
//                .map(p -> {
//
//                    SeaImage seaImage = imageRepository.findById(p.getSeaImage().getImageId()).orElseThrow(() -> new RuntimeException("이미지정보가 잘못 되었습니다."));
//                    return new mainListResponseDTO(p, seaImage);
//                }).collect(Collectors.toList());
    }

    public ResponseMyEduDTO getMyEdu( @AuthenticationPrincipal TokenUserInfo userInfo) {

        User user = userRepository.findById(userInfo.getUserId()).orElseThrow();

        Edu byUserUserId = eduRepository.findByUserUserId(user);

        if (byUserUserId==null){
            new RuntimeException("등록된 클래스가없습니다");
        }

        List<String> eduImageUrl = new ArrayList<>();
        List<SeaImage> allByEdu = imageRepository.findAllByEdu(byUserUserId);

        for (SeaImage seaImage : allByEdu) {
            String imageName = seaImage.getImageName();
            eduImageUrl.add(imageName);
        }

        ResponseMyEduDTO responseMyEduDTO = new ResponseMyEduDTO();
        responseMyEduDTO.setEduLevel(byUserUserId.getEduLevel());
        responseMyEduDTO.setDescription(byUserUserId.getEduService());
        responseMyEduDTO.setUserName(byUserUserId.getUser().getUserName());
        responseMyEduDTO.setEduTitle(byUserUserId.getEduTitle());
        responseMyEduDTO.setEduImageList(eduImageUrl);

        return responseMyEduDTO;

    }
}