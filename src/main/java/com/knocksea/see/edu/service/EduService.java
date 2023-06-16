package com.knocksea.see.edu.service;

import com.knocksea.see.edu.dto.response.EduModifyDTO;
import com.knocksea.see.edu.dto.request.EduAndReservationTimeCreateDTO;
import com.knocksea.see.edu.dto.response.EduDetailResponseDTO;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.repository.EduRepository;
import com.knocksea.see.product.entity.ReservationTime;
import com.knocksea.see.product.repository.ReservationTimeRepository;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class EduService {

    private final EduRepository eduRepository;
    private final ReservationTimeRepository reservationTimeRepository;
    private final UserRepository userRepository;

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

        List<ReservationTime> timeList = new ArrayList<>();
        //등록한 예약시간 개수만큼 save하면 됨.
        for (int i = 0; i < dto.getTimeDate().size(); i++) {
            for (int j = 0; j < dto.getTimeStart().size(); j++) {
                ReservationTime savereservationTime
                        = reservationTimeRepository.save(dto.toReservationTimeEntity(i, j, saveEdu));
                timeList.add(savereservationTime);
            }
        }

        return new EduDetailResponseDTO(saveEdu, timeList);
    }

    //클래스 수정
    public EduDetailResponseDTO modify(final EduModifyDTO dto) throws RuntimeException{

        final Edu eduEntity=getEdu(dto.getEduId());

        eduEntity.update(dto);

        Edu modifiedEdu = eduRepository.save(eduEntity);

//        return new EduDetailResponseDTO(modifiedEdu);
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

    //삭제
    public void delete(Long eduId) throws RuntimeException{
        eduRepository.deleteById(eduId);
    }
}