package com.knocksea.see.user.service;


import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.user.dto.request.ShipModifyRequestDTO;
import com.knocksea.see.user.dto.request.ShipRegisterRequestDTO;
import com.knocksea.see.user.dto.response.ShipModifyResponseDTO;
import com.knocksea.see.user.dto.response.ShipRegisterResponseDTO;
import com.knocksea.see.user.entity.Ship;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.ShipRepository;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public ShipRegisterResponseDTO save(final ShipRegisterRequestDTO dto, Long userId) {

        log.info("{} 유저 정보 : ",dto);
        if (dto==null){
            throw new NoRegisteredArgumentsException("필수 배등록 정보가 없습니다");
        }

        User user = userRepository.findById(userId).orElseThrow(()->
                new RuntimeException("회원 정보가 없습니다"));

        //배는 사장만 등록 할 수 있음
        if(user.getUserGrade().equals("owner")){
            //배 중복등록방지용 유저pk (배는 1인당 1대씩만등록가능)

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


//    배정보 수정 함수
    public ShipModifyResponseDTO modify(final ShipModifyRequestDTO dto, final TokenUserInfo userInfo) {

        Ship foundByUserId = shipRepository.findByUserUserId(userInfo.getUserId());

        //사장님이 아니라면
        if(foundByUserId.getUser().getUserGrade().equals("user")) ResponseEntity.badRequest().body("사장님이 아니면 수정할 수없습니다");

        //등록된 배가 있다면
        if(foundByUserId!=null){
            foundByUserId.modifyShipInfo(dto);
            Ship save = shipRepository.save(foundByUserId);
            return new ShipModifyResponseDTO(save);
        }else{
            //등록된 배가없다면
            throw new RuntimeException("등록된 배가없습니다!.");
        }

    }
}
