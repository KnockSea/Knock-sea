package com.knocksea.see.user.service;


import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.user.dto.request.ShipModifyRequestDTO;
import com.knocksea.see.user.dto.request.ShipRegisterRequestDTO;
import com.knocksea.see.user.dto.response.ShipModifyResponseDTO;
import com.knocksea.see.user.dto.response.ShipRegisterResponseDTO;
import com.knocksea.see.user.dto.response.ShipInfoResponseDTO;
import com.knocksea.see.user.entity.SeaImage;
import com.knocksea.see.user.entity.Ship;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.entity.UserGrade;
import com.knocksea.see.user.repository.ImageRepository;
import com.knocksea.see.user.repository.ShipRepository;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ShipService {
    //선박 엔티티관련 리파지토리
    private final ShipRepository shipRepository;

    //유저 정보 가져오기용 리파지토리
    private final UserRepository userRepository;

    //이미지 가져오기용 리파지토리
    private final ImageRepository imageRepository;



    //선박 등록 함수
    public ShipRegisterResponseDTO save(final ShipRegisterRequestDTO dto, Long userId) {

        log.info("{} 유저 정보 : ",dto);
        if (dto==null){
            throw new NoRegisteredArgumentsException("필수 배등록 정보가 없습니다");
        }

        User user = userRepository.findById(userId).orElseThrow(()->
                new RuntimeException("회원 정보가 없습니다"));

        //배는 사장만 등록 할 수 있음
        if(user.getUserGrade().toString().equals("OWNER")){
            //배 중복등록방지용 유저pk (배는 1인당 1대씩만등록가능)

            Ship foundByUserId = shipRepository.findByUser(user);
            //등록된 배가 없다면
            if(foundByUserId==null){
                //dto를 ship엔티티로 변환
                Ship saveship = Ship.builder().shipDescription(dto.getShipDescription()).shipName(dto.getShipName()).user(user).build();
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

        User user = userRepository.findById(userInfo.getUserId()).orElseThrow(() -> {
            throw new RuntimeException("유저가 존재하지않습니다");
        });

        Ship foundByUserId = shipRepository.findByUser(user);

        //사장님이 아니라면
        if(!foundByUserId.getUser().getUserGrade().toString().equals("OWNER")) ResponseEntity.badRequest().body("사장님이 아니면 수정할 수없습니다");

        List<String> modifyShipImagesSaveLocation = new ArrayList<>();
        //등록된 배가 있다면
        if(foundByUserId!=null){
            foundByUserId.modifyShipInfo(dto);
            Ship save = shipRepository.save(foundByUserId);
            List<SeaImage> images = save.getImages();
            for (SeaImage image : images) {
                modifyShipImagesSaveLocation.add(image.getImageName());
            }
            return new ShipModifyResponseDTO(save,modifyShipImagesSaveLocation);
        }else{
            //등록된 배가없다면
            throw new RuntimeException("등록된 배가없습니다!.");
        }

    }

    //유저 정보로 배정보 가져오기
    public ShipInfoResponseDTO getShipInfo(TokenUserInfo userInfo) {

        //유저 토큰정보로 해당유저 정보 가져오기
        User user = userRepository.findById(userInfo.getUserId()).orElseThrow(() -> {
            throw new RuntimeException("해당유저는 존재하지않습니다!");
        });

        //가져온 유저로 해당유저가 등록한 배 정보 가져오기
        Ship findShipByUser = shipRepository.findByUser(user);

        if (findShipByUser==null) throw new RuntimeException();

        List<SeaImage> byShip = imageRepository.findByShip(findShipByUser);

        List<String> shipLocationList = new ArrayList<>();
        for (SeaImage seaImage : byShip) {
           shipLocationList.add(seaImage.getImageName());
        }

        ShipInfoResponseDTO build = ShipInfoResponseDTO.builder()
                .shipLikeCount(findShipByUser.getShipLikeCount())
                .shipId(findShipByUser.getShipId())
                .shipDescription(findShipByUser.getShipDescription())
                .shipName(findShipByUser.getShipName())
                .userName(findShipByUser.getUser().getUserName())
                .category(findShipByUser.getProductCategory())
                .shipImageLocation(shipLocationList)
                .build();

        return build;

    }

    //배 정보 삭제하는 함수
    public boolean deleteSpot(TokenUserInfo userInfo) {

        //토큰 정보값으로 유저 얻기
        User user = userRepository.findById(userInfo.getUserId()).orElseThrow(() -> new RuntimeException("해당 유저정보가 존재하지않습니다"));

        if(!user.getUserGrade().equals(UserGrade.OWNER)){
            throw new RuntimeException("해당 선박의 사장이아니므로 삭제할 수없습니다");
        }

        Ship findShipByUser = shipRepository.findByUser(user);

        if (findShipByUser != null) {

            shipRepository.deleteById(findShipByUser.getShipId());

            return true;
        }

        return false;

    }


    //배 이미지 리스트 경로 반환하는함수
//    public String findShipPath(Long userId,Long typenumber) {
//        User user = userRepository.findById(userId).orElseThrow();
//
//        Ship findShip = shipRepository.findByUser(user);
//
//        SeaImage byImageTypeAndTypeNumber = imageRepository.findByImageTypeAndTypeNumber(findShip, typenumber);
//
//        return byImageTypeAndTypeNumber.getImageName();
//    }

}
