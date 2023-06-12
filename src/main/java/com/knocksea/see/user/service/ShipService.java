package com.knocksea.see.user.service;


import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.user.dto.request.ShipRegisterRequestDTO;
import com.knocksea.see.user.dto.response.ShipRegisterResponseDTO;
import com.knocksea.see.user.entity.Ship;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.ShipRepository;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ShipService {
    //선박 엔티티관련 리파지토리
    private final ShipRepository shipRepository;

    //유저 정보 가져오기용 리파지토리
    private final UserRepository userRepository;

    //선박 등록 함수
    public ShipRegisterResponseDTO join(final ShipRegisterRequestDTO dto) {

        log.info("{} 유저 정보 : ",dto);
        if (dto==null){
            throw new NoRegisteredArgumentsException("필수 배등록 정보가 없습니다");
        }

        //유저 이메일 받아오기
        String userEmail = dto.getUserEmail();

        //유저 정보가 비었다면
        User user = userRepository.findByUserEmail(userEmail).orElseThrow();

        //배는 사장만 등록 할 수 있음
        if(user.getUserGrade().equals("owner")){
            //배 중복등록방지용 유저pk (배는 1인당 1대씩만등록가능)
            Long userId = user.getUserId();

            Ship foundByUserId = shipRepository.findByUserUserId(userId);
            //등록된 배가 없다면
            if(foundByUserId==null){
                //dto를 ship엔티티로 변환
                Ship saveship = Ship.builder().shipDescription(dto.getShipDescription()).shipSerial(dto.getShipSerial()).shipLocation(dto.getShipLocation()).shipName(dto.getShipName()).user(user).build();
                Ship save = shipRepository.save(saveship);
                return new ShipRegisterResponseDTO(save);
            }else{
                throw new RuntimeException("배는 한명당 한대만 등록할 수 있습니다.");
            }
        }else{
            throw new RuntimeException("사장이아니면 등록할 수 없습니다");
        }


    }
}
