package com.knocksea.see.user.service;

import com.knocksea.see.auth.TokenProvider;
import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.aws.S3Service;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.repository.EduRepository;
import com.knocksea.see.heart.entity.Heart;
import com.knocksea.see.heart.repository.HeartRepository;
import com.knocksea.see.product.dto.response.ReservationResponseDTO;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.entity.Reservation;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.product.repository.ProductRepository;
import com.knocksea.see.product.repository.ReservationRepository;
import com.knocksea.see.product.repository.ReservationTimeRepository;
import com.knocksea.see.review.entity.Review;
import com.knocksea.see.review.repository.ReviewRepository;
import com.knocksea.see.user.dto.request.LoginRequestDTO;
import com.knocksea.see.user.dto.request.UserDeleteRequest;
import com.knocksea.see.user.dto.request.UserModifyRequestDTO;
import com.knocksea.see.user.dto.request.UserRegisterRequestDTO;
import com.knocksea.see.user.dto.response.*;
import com.knocksea.see.user.entity.SeaImage;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.exception.DuplicatedEmailException;
import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.user.repository.ImageRepository;
import com.knocksea.see.user.repository.ShipRepository;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserService {


    //리파지토리용
    private final UserRepository userRepository;
    //비밀번호 암호화용
    private final PasswordEncoder encoder;
    //토큰 인증용
    private final TokenProvider tokenProvider;

    //상품 리스트 접근용
    private final ProductRepository productRepository;

    //후기 리스트 접근용
    private final ReviewRepository reviewRepository;

    //선박 리스트 접근용
    private final ShipRepository shipRepository;

    //좋아요 리스트 접근용
    private final HeartRepository heartRepository;

    //이미지 객체 접근용 리파지토리
    private final ImageRepository imageRepository;

    //이미지 저장 서비스
    private final ImageService imageService;

    //아마존 s3접근용
    private final S3Service s3Service;
    private final ReservationRepository reservationRepository;
    private final ReservationTimeRepository reservationTimeRepository;
    private final EduRepository eduRepository;



    @Value("${upload.path}")
    private String uploadRootPath;

    //회원가입 기능
    public boolean join(final UserRegisterRequestDTO dto, String uploadedFilePath) throws RuntimeException{

        if(dto==null){
            throw new NoRegisteredArgumentsException("가입 정보가 없습니다");
        }

        String email = dto.getUserEmail();
        if(userRepository.existsByUserEmail(email)){
            log.warn("이메일이 중복되었습니다. -{}",email);
            throw new DuplicatedEmailException("중복된 이메일입니다");
        }
        //중복되지 않았다면 ...
        //패스워드 인코딩
        String encode = encoder.encode(dto.getUserPassword());

        //회원 객체 비밀번호 인코딩된 비밀번호로 저장..
        dto.setUserPassword(encode);

        //dto를 엔티티로 변환
        User user = dto.toEntity(uploadedFilePath);


        //엔티티를 저장하고 리턴값 반환
        User saveuser = userRepository.save(user);


        log.info("회원가입 정상 수행! - saved user - {}",saveuser);

        //리턴값이 비어있지않다면 회원가입성공
        //비어있다면 회원가입 실패
        if(saveuser!=null){
            return true;
        }else{
            return false;
        }

    }

    //유저정보를 수정할 수 있다.
    public UserModifyresponseDTO modify(final UserModifyRequestDTO dto, final TokenUserInfo userInfo) throws Exception {

        if(dto==null){
            throw new NoRegisteredArgumentsException("가입 정보가 없습니다");
        }

        //dto값이 비지않았다면...
        //dto에서 이메일 값 받아오기
        String email = dto.getUserEmail();

        boolean byUserEmail = userRepository.existsByUserEmail(dto.getUserEmail());
        if(byUserEmail){
            throw new RuntimeException("이메일 중복입니다!");
        }

        User user = userRepository.findById(userInfo.getUserId()).orElseThrow();
        user.setUserEmail(dto.getUserEmail());
        user.setUserPhone(dto.getUserPhone());
        user.setUserAddress(dto.getUserAddress());
        user.setUserFullAddress(dto.getUserFullAddress());
        user.setUserName(dto.getUserName());
        User modiftideuser = userRepository.save(user);
        log.info("modiftideuser ; {}",modiftideuser);
        return new UserModifyresponseDTO(modiftideuser);
    }


    //로그인 검증및 토큰발급
    public LoginResponseDTO authenticate(final LoginRequestDTO dto) {
        //이메일을 통해 회원정보 조회
        User user = userRepository.findByUserEmail(dto.getUserEmail()).orElseThrow(
                () -> new RuntimeException("가입된 회원이 아닙니다.")
        );

        //패스워드를 검증한다
        String rawPassword = dto.getUserPassword(); //입력비번
        String encodedPassword = user.getUserPassword(); //db저장 비번

        if (!encoder.matches(rawPassword,encodedPassword)){
            throw new RuntimeException("비밀번호가 틀렸습니다");
        }

        log.info("{}님 로그인 성공!!", user.getUserName());

        //로그인 성공 후에 클라이언트에 뭘 리턴할 것인가?
        //-> JWT를 클라이언트에게 발급해줘야 함.
        String token = tokenProvider.createToken(user);

        return new LoginResponseDTO(user, token);
    }

    //회원탈퇴 기능 구현
    public boolean deleteUser(UserDeleteRequest dto, TokenUserInfo userInfo) {

        User user = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new RuntimeException("가입된 회원이 아닙니다.")
        );

        String encodedPassword = user.getUserPassword(); //db저장 비번
        if (!encoder.matches(dto.getUserPassword(),encodedPassword)){
            throw new RuntimeException("비밀번호가 일치하지않아 회원탈퇴를 진행할 수 없습니다");
        }

        userRepository.deleteById(userInfo.getUserId());
        return true;
    }

    //이메일 중복검사 코드
    public boolean isDuplicate(String email) {
        return userRepository.existsByUserEmail(email);
    }

    //프로필 사진 업로드 기능
    public String uploadProfileImage(MultipartFile originalFile) throws IOException {
        //루트 디렉토리가 존재하는지 확인후 존재하지않으면 생성하는 코드
//        File rootDir = new File(uploadRootPath);
//        if(!rootDir.exists()) rootDir.mkdir();

        //파일명을 유니크하게 변경
        String uniqueFileName = UUID.randomUUID() + "_" + originalFile.getOriginalFilename();

        //파일을 저장
//        File uploadFile = new File(uploadRootPath + "/" + uniqueFileName);
//
//        originalFile.transferTo(uploadFile);
        //파일을 s3 버킷에 저장
        String uploadUrl = s3Service.uploadToS3Bucket(originalFile.getBytes(), uniqueFileName);

        return uploadUrl;

    }

    //파일 저장경로 얻어오기
    public String findProfilePath(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return user.getProfileImg();
    }

    // OWNER 기능 : 배, 낚시터, 클래스 정보 다 따로 조회하는거 만들어야 함
    public EntireInfoResponseDTO getEntireInfo(TokenUserInfo userInfo) {
        //후기 / 좋아요 리스트 담을 dto선언
        EntireInfoResponseDTO entireInfoResponseDTO = new EntireInfoResponseDTO();

        User user = userRepository.findById(userInfo.getUserId()).orElseThrow(()
                -> new RuntimeException("해당 유저는 존재하지않습니다"));

        //유저 객체로 상품리스트 뽑아오기
        List<Product> findByUser = productRepository.findByUser(user);
        List<Edu> findEdu = eduRepository.findByUser(user);
        log.warn("찾아라{} 드래곤볼 :{}", findEdu, findByUser);

        int shipReviewTotal = 0;
        int spotReviewTotal = 0;
        int eduReviewTotal = 0;
        //상품 리스트만큼 배열 돌아가면서 타입 구분
        for (Product product : findByUser) {
            //상품 타입이 선박이라면 ? 선박의 리뷰들만 뽑아온다
            if (product.getProductType().equals("SHIP")){
                List<Review> findByShipReviews = reviewRepository.findByProduct(product);
                entireInfoResponseDTO.setShipReviewList(findByShipReviews);
                for (Review findByShipReview : findByShipReviews) {
                    Double reviewRating = findByShipReview.getReviewRating();
                    shipReviewTotal += reviewRating;
                }

                entireInfoResponseDTO.setShipReviewAvgScore((int)shipReviewTotal/findByShipReviews.size());
                //상품 타입이 낚시터라면 ? 낚시터의 리뷰들만 뽑아온다
            }else if(product.getProductType().equals("SPOT")){
                List<Review> findBySpotReviews = reviewRepository.findByProduct(product);
                entireInfoResponseDTO.setSpotReviewList(findBySpotReviews);
                for (Review findBySpotReview : findBySpotReviews) {
                    Double reviewRating = findBySpotReview.getReviewRating();
                    spotReviewTotal +=reviewRating;
                }
                entireInfoResponseDTO.setSpotReviewAvgScore((int)spotReviewTotal/findBySpotReviews.size());
            }
        }
        for (Edu edu : findEdu) {
            //상품 타입이 교육이라면 ? 교육의 리뷰들만 뽑아온다
            List<Review> findByEduReviews = reviewRepository.findAllByEdu(edu);
            entireInfoResponseDTO.setEduReviewList(findByEduReviews);
            for (Review findByEduReview : findByEduReviews) {
                Double reviewRating = findByEduReview.getReviewRating();
                eduReviewTotal+=reviewRating;
            }
            entireInfoResponseDTO.setEduReviewAvgScore((int)eduReviewTotal/findByEduReviews.size());
        }

        for (Product product : findByUser) {
            if(product.getProductType().equals("SHIP")){
                List<Heart> findByShipHeartList = heartRepository.findByProduct(product);
                entireInfoResponseDTO.setHeartListShip(findByShipHeartList);
            } else if (product.getProductType().equals("SPOT")) {
                List<Heart> findBySpotHeartList = heartRepository.findByProduct(product);
                entireInfoResponseDTO.setHeartListSpot(findBySpotHeartList);
            }else{
                List<Heart> findByEduHeartList = heartRepository.findByProduct(product);
                entireInfoResponseDTO.setHeartListEdu(findByEduHeartList);
            }
        }

        Optional<Review> reservedNumber = reviewRepository.findById(userInfo.getUserId());
        log.info("reservedNumber : "+reservedNumber);

        return entireInfoResponseDTO;
    }


    //프로필 사진 변경 함수
    public void modifyProfileImage(MultipartFile profileImg, Long userId) throws IOException {

        //토큰값에 해당하는 유저 정보 가져오기!
        User user = userRepository.findById(userId).orElseThrow(()-> new RuntimeException("해당 유저는 존재하지않습니다"));

        //새로 입력받은 이미지 이름 만들기!
        String uniqueFileName = UUID.randomUUID() + "_" + profileImg.getOriginalFilename();

        //아마존 aws 이미지파일저장
        String uploadUrl = s3Service.uploadToS3Bucket(profileImg.getBytes(), uniqueFileName);

        //기존에 저장되어있던 이미지 경로
        String savedFilePath = user.getProfileImg();

        savedFilePath = uploadUrl;

//        if (savedFilePath==null){
//            File imageFile = new File(uniqueFileName, user.getProfileImg());
//        }



//        File uploadFile = new File(uploadRootPath + "/" + uniqueFileName);

//        profileImg.transferTo(uploadFile);

        user.setProfileImg(savedFilePath);

        userRepository.save(user);

    }


    public UserMyPageResponseDTO userMyPageInfo(TokenUserInfo userInfo) {

        User user = userRepository.findById(userInfo.getUserId()).orElseThrow(() -> new RuntimeException("정보가 올바르지 않습니다."));

        // 이거 리스트네? 유저가 예약한것들 전체
        List<Reservation> reservation = reservationRepository.findAllByUser(user);

        //유저가 작성한 리뷰를 찾고


        List<ReservationResponseDTO> reservationResponseDTOS = new ArrayList<>();
        List<Long> eduIdByUserId = null;
        for (Reservation r : reservation) {
            ReservationTime time = r.getReservationTime();
            if(r.getReservationType().equals("EDU")){
                Edu edu=r.getEdu();
                SeaImage seaImage= imageRepository.findAllByEdu(edu).get(0);
                eduIdByUserId= reviewRepository.findEduIdByUserId(user.getUserId());
                log.info("eduIdByUserId : "+eduIdByUserId); //reviewIdByUser : [7, 11]
                reservationResponseDTOS.add(new ReservationResponseDTO(r, time, edu, seaImage));
            }else {
                Product product = r.getProduct();
                SeaImage seaImage = imageRepository.findByProduct_ProductId(product.getProductId()).get(0);
                eduIdByUserId = reviewRepository.findProductIdByUserId(user.getUserId());
                log.info("productIdByUserId : "+eduIdByUserId); //reviewIdByUser : [7, 11]
                reservationResponseDTOS.add(new ReservationResponseDTO(r, time, product, seaImage));
            }

        }
        log.info("reservationResponseDTOS : "+reservationResponseDTOS);
        return new UserMyPageResponseDTO(user, reservationResponseDTOS,eduIdByUserId);
    }

    public AllReviewsResponseDTO getMyproductReview(Long userId) {

        Product ship = null;
        Product spot = null;
        Edu edu = null;
        
        //유저 번호로 유저 가져오기
        User findUserById = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("해당유저는 존재하지않습니다"));

        //유저로  상품 가져오기
        List<Product> findbyUserProduct = productRepository.findByUser(findUserById);
        
        
        //유저 정보로 클래스 가져오기!
        Edu findEduByUser = eduRepository.findByUserUserId(findUserById);
        

        if(findbyUserProduct==null){
            throw new RuntimeException("등록된 상품(교육)이 존재하지않습니다!");
        }
        
        if(findEduByUser==null){
            throw new RuntimeException("등록한 교육이 존재하지않습니다!");
        }

        //상품들 돌리면서 타입별로 집어넣어놓기
        for (Product product : findbyUserProduct) {
            if (product.getProductType().toString().equals("SHIP")){
                ship = product;
            }else if(product.getProductType().toString().equals("SPOT")){
                spot = product;
            }
        }


        //두개의 상품 타입을 받아서 리턴하기! //1차 포장하기
        AllReviewsResponseDTO reviewsByProduct = findReviewsByProduct(ship, spot, edu);

        return reviewsByProduct;


    }

    private AllReviewsResponseDTO findReviewsByProduct(Product ship, Product spot, Edu edu) {

        //배 상품의 리뷰들 가져오기!
        List<Review> shipProductReviews = reviewRepository.findByProduct(ship);

        //낚시터 상품의 리뷰들 가져오기!
        List<Review> spotProductReviews = reviewRepository.findByProduct(spot);

        //클래스의 리뷰들 가져오기
        List<Review> eduReviews = reviewRepository.findAllByEdu(edu);


        List<SeaImage> shipImages = imageRepository.findByProduct(ship);

        List<SeaImage> spotImages = imageRepository.findByProduct(spot);

        List<SeaImage> eduImages = imageRepository.findAllByEdu(edu);


        //배 리뷰 가져오기
        List<userShipProductReviewResponseDTO> shipProductReviewList
                = shipProductReviews.stream()
                .map(review -> new userShipProductReviewResponseDTO
                        (review.getReviewContent()
                                , review.getUser()
                                , review.getReviewId()
                                , review.getReviewRating()
                                , review.getInquiryDateTime()
                                ,shipImages)).collect(Collectors.toList());

        //낚시터 리뷰 가져오기
        List<userSpotProductReviewResponseDTO> spotProductReviewList = spotProductReviews.stream().map(review -> new userSpotProductReviewResponseDTO(review.getReviewContent(), review.getUser(), review.getReviewId(), review.getReviewRating(), review.getInquiryDateTime(),spotImages)).collect(Collectors.toList());

        //클래스 리뷰 가져오기
        List<userEduReviewResponseDTO> eduProductReviewList = eduReviews.stream().map(review -> new userEduReviewResponseDTO(review.getReviewContent(), review.getUser(), review.getReviewId(), review.getReviewRating(), review.getInquiryDateTime(), eduImages)).collect(Collectors.toList());


        return AllReviewsResponseDTO.builder()
                .userShipProductReviewResponseDTO(shipProductReviewList)
                .userSpotProductReviewResponseDTO(spotProductReviewList)
                .userEduReviewResponseDTO(eduProductReviewList)
                .build();
    }

//    private  foundReserve(List<Reservation> reservation, List<ReservationResponseDTO> reservationResponseDTOS) {
//
//    }
}