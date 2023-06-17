package com.knocksea.see.user.service;

import com.knocksea.see.auth.TokenProvider;
import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.heart.entity.Heart;
import com.knocksea.see.heart.repository.HeartRepository;
import com.knocksea.see.product.entity.Product;
import com.knocksea.see.product.repository.ProductRepository;
import com.knocksea.see.review.entity.Review;
import com.knocksea.see.review.repository.ReviewRepository;
import com.knocksea.see.user.dto.request.LoginRequestDTO;
import com.knocksea.see.user.dto.request.UserDeleteRequest;
import com.knocksea.see.user.dto.request.UserModifyRequestDTO;
import com.knocksea.see.user.dto.request.UserRegisterRequestDTO;
import com.knocksea.see.user.dto.response.EntireInfoResponseDTO;
import com.knocksea.see.user.dto.response.LoginResponseDTO;
import com.knocksea.see.user.dto.response.UserModifyresponseDTO;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.exception.DuplicatedEmailException;
import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.user.repository.ShipRepository;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

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


        log.info("회원가입 정상 수행됌! - saved user - {}",saveuser);

        //리턴값이 비어있지않다면 회원가입성공
        //비어있다면 회원가입 실패
        if(saveuser!=null){
            return true;
        }else{
            return false;
        }

    }

    //유저정보를 수정할 수 있다.
    public UserModifyresponseDTO modify(UserModifyRequestDTO dto) throws Exception {
        if(dto==null){
            throw new NoRegisteredArgumentsException("가입 정보가 없습니다");
        }

        //dto값이 비지않았다면...
        //dto에서 이메일 값 받아오기
        String email = dto.getUserEmail();


        //이메일로 유저정보 얻기 (이메일은 유일값이기때문에 ..)
        User founduser = userRepository.findByUserEmail(email).orElseThrow(() -> new Exception("회원정보 수정에 실패했습니다!"));

        //이메일로 찾은 객체에 dto에 수정하고자 하는 정보들을 뽑아서 새로 집어넣고 다시 저장해준다
        founduser.setUserAddress(dto.getUserAddress());
        founduser.setUserFullAddress(dto.getUserFullAddress());
        founduser.setUserPhone(dto.getUserPhone());
        founduser.setUserName(dto.getUsername());

        User modiftideuser = userRepository.save(founduser);

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
    public boolean deleteUser(UserDeleteRequest dto) {

        User user = userRepository.findById(dto.getUserId()).orElseThrow(
                () -> new RuntimeException("가입된 회원이 아닙니다.")
        );

        String encodedPassword = user.getUserPassword(); //db저장 비번
        if (!encoder.matches(dto.getUserPassword(),encodedPassword)){
            throw new RuntimeException("비밀번호가 일치하지않아 회원탈퇴를 진행할 수 없습니다");
        }

        userRepository.deleteById(dto.getUserId());
        return true;
    }

    //이메일 중복검사 코드
    public boolean isDuplicate(String email) {
        return userRepository.existsByUserEmail(email);
    }

    public String uploadProfileImage(MultipartFile originalFile) throws IOException {
        //루트 디렉토리가 존재하는지 확인후 존재하지않으면 생성하는 코드
        File rootDir = new File(uploadRootPath);
        if(!rootDir.exists()) rootDir.mkdir();

        //파일명을 유니크하게 변경
        String uniqueFileName = UUID.randomUUID() + "_" + originalFile.getOriginalFilename();

        //파일을 저장
        File uploadFile = new File(uploadRootPath + "/" + uniqueFileName);

        originalFile.transferTo(uploadFile);

        return uniqueFileName;
    }
    public String findProfilePath(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return uploadRootPath + "/" + user.getProfileImg();
    }

    //전체 리뷰/좋아요 리스트 받아오기
    public EntireInfoResponseDTO getEntireInfo(TokenUserInfo userInfo) {
        //후기 / 좋아요 리스트 담을 dto선언
        EntireInfoResponseDTO entireInfoResponseDTO = new EntireInfoResponseDTO();


        User user = userRepository.findById(userInfo.getUserId()).orElseThrow(()
                -> new RuntimeException("해당 유저는 존재하지않습니다"));

        //유저 객체로 상품리스트 뽑아오기
        List<Product> findByUser = productRepository.findByUser(user);
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
                    Long reviewRating = findByShipReview.getReviewRating();
                    shipReviewTotal += reviewRating;
                }
                entireInfoResponseDTO.setShipReviewAvgScore((int)shipReviewTotal/findByShipReviews.size());
                //상품 타입이 낚시터라면 ? 낚시터의 리뷰들만 뽑아온다
            }else if(product.getProductType().equals("SPOT")){
                List<Review> findBySpotReviews = reviewRepository.findByProduct(product);
                entireInfoResponseDTO.setSpotReviewList(findBySpotReviews);
                for (Review findBySpotReview : findBySpotReviews) {
                    Long reviewRating = findBySpotReview.getReviewRating();
                    spotReviewTotal +=reviewRating;
                }
                entireInfoResponseDTO.setSpotReviewAvgScore((int)spotReviewTotal/findBySpotReviews.size());
            }else{
                //상품 타입이 교육이라면 ? 교육의 리뷰들만 뽑아온다
                List<Review> findByEduReviews = reviewRepository.findByProduct(product);
                entireInfoResponseDTO.setEduReviewList(findByEduReviews);
                for (Review findByEduReview : findByEduReviews) {
                    Long reviewRating = findByEduReview.getReviewRating();
                    eduReviewTotal+=reviewRating;
                }
                entireInfoResponseDTO.setEduReviewAvgScore((int)eduReviewTotal/findByEduReviews.size());
            }

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

        return entireInfoResponseDTO;

    }
}
