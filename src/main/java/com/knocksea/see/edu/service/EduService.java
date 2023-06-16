package com.knocksea.see.edu.service;

import com.knocksea.see.edu.dto.response.EduModifyDTO;
import com.knocksea.see.edu.dto.request.EduAndReservationTimeCreateDTO;
import com.knocksea.see.edu.dto.response.EduDetailResponseDTO;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.repository.EduRepository;
import com.knocksea.see.product.entity.Reservation;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.product.repository.ReservationRepository;
import com.knocksea.see.product.repository.ReservationTimeRepository;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class EduService {

    private final EduRepository eduRepository;
    private final ReservationTimeRepository reservationTimeRepository;
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;
    public List<ReservationTime> timeList;

    //전체 조회
    public void getAllEdu() {
        List<Edu> allEdu = eduRepository.findAll();
    }

    //개별 조회
    public EduDetailResponseDTO getDetail(Long eduId) {
        Edu edu = getEdu(eduId);

//        return new EduDetailResponseDTO(edu);
        return null;
    }

    //클래스 저장
    public EduDetailResponseDTO insert(final EduAndReservationTimeCreateDTO dto) throws RuntimeException{
        log.info("dto의 id : " + dto.getUserId());
        Long userId = dto.getUserId();
        //유저 정보는 토큰을 이용해서 저장. 토큰하기 전까지만 이렇게
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("존재하지 않은 회원입니다."));

        if (eduRepository.findById(userId)!=null){
            throw new RuntimeException("이미 등록한 클래스가 있습니다.");
        }

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
    public EduDetailResponseDTO modify(EduAndReservationTimeCreateDTO dto) throws RuntimeException{

        Long userId = dto.getUserId();

        log.info("asdfkja;sldfj : "+userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("유저 없음"));

        log.info("asdfkja;sldfj2 : "+user);

        Edu edu = eduRepository.findByUserUserId(user);

        log.info("a;sldkfj;alskdfj;laskd"+edu);

        //만약에 time_current_user가 1명 이상이면 수정못하도록
//        Optional<Reservation> reservation = getReservationTime(edu);
        Reservation reservation = reservationRepository.findByEduEduId(edu).orElseThrow(() -> new RuntimeException("마"));
        log.info("alsdkfjlsdkfj");
        if(reservation!= null){
            throw new RuntimeException("신청 인원이 한명 이상이므로 수정할 수 없음");
        }
        log.info("1234567890");
        
        //ReservationTime 아예 삭제시키고 다시 등록시킴
        reservationTimeRepository.deleteByEduEduId(edu);

        //수정한 예약시간 개수만큼 save
        for (int i = 0; i < dto.getTimeDate().size(); i++) {
            for (int j = 0; j < dto.getTimeStart().size(); j++) {
                ReservationTime savereservationTime
                        = reservationTimeRepository.save(dto.toReservationTimeEntity(i, j, edu));
            }
        }
        Edu modifiedEdu = eduRepository.save(edu);
//        return new EduDetailResponseDTO(modifiedEdu);
//        return getDetail(edu.getEduId());
        return null;
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
        log.info("123123 : "+edu);
        return reservationRepository.findByEduEduId(edu);
    }

    //삭제
    public void delete(Long eduId) throws RuntimeException{
        //만약에 time_current_user가 1명 이상이면 삭제하지 못하도록
        
        eduRepository.deleteById(eduId);
    }
}