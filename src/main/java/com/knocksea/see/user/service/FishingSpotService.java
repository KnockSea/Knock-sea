package com.knocksea.see.user.service;


import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.user.dto.request.FishingModifyRequestDTO;
import com.knocksea.see.user.dto.request.FishingSpotRegisterRequestDTO;
import com.knocksea.see.user.dto.response.FishingSpotInfoResponseDTO;
import com.knocksea.see.user.dto.response.FishingSpotModifyResponseDTO;
import com.knocksea.see.user.dto.response.FishingSpotRegisterResponseDto;
import com.knocksea.see.user.dto.response.ShipModifyResponseDTO;
import com.knocksea.see.user.entity.FishingSpot;
import com.knocksea.see.user.entity.SeaImage;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.FishingSpotRepository;
import com.knocksea.see.user.repository.ImageRepository;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class FishingSpotService {

    //선박 엔티티관련 리파지토리
    private final FishingSpotRepository fishingSpotRepository;

    //유저 정보 가져오기용 리파지토리
    private final UserRepository userRepository;

    //이미지 가져오기용 리파지토리
    private final ImageRepository imageRepository;



    public FishingSpotRegisterResponseDto save(FishingSpotRegisterRequestDTO dto, Long userId) {
        log.info("{} 유저 정보 : ",dto);

        if (dto==null){
            throw new NoRegisteredArgumentsException("필수 배등록 정보가 없습니다");
        }
        User user = userRepository.findById(userId).orElseThrow(()->
                new RuntimeException("회원 정보가 없습니다"));

        //낚시터는 사장만 등록 할 수 있음
        if(user.getUserGrade().toString().equals("OWNER")){
            //낚시터 중복등록방지용 유저pk (배는 1인당 1대씩만등록가능)

            FishingSpot foundByUserId = fishingSpotRepository.findByUser(user);
            //등록된 낚시터가없다면
            if(foundByUserId==null){
                //dto를 ship엔티티로 변환
                FishingSpot saveship = FishingSpot.builder().spotName(dto.getSpotName()).spotSerialNumber(dto.getSpotSerialNumber()).spotDescription(dto.getSpotDescription()).spotLocation(dto.getSpotLocation()).user(user).build();
                FishingSpot save = fishingSpotRepository.save(saveship);
                return new FishingSpotRegisterResponseDto(save);
            }else{
                throw new RuntimeException("낚시터는 한명당 한대만 등록할 수 있습니다.");
            }
        }else{
            throw new RuntimeException("사장이아니면 등록할 수 없습니다");
        }
    }



   // 낚시터 정보 수정용 함수
    public FishingSpotModifyResponseDTO modify(FishingModifyRequestDTO dto, TokenUserInfo userInfo) {


        return null;
    }


    //유저 정보로 낚시터 정보 가져오기 함수
    public FishingSpotInfoResponseDTO getShipInfo(TokenUserInfo userInfo) {

        User user = userRepository.findById(userInfo.getUserId()).orElseThrow(() -> {
            throw new RuntimeException("해당 유저가 존재하지않습니다");
        });

        FishingSpot findSpotByUser = fishingSpotRepository.findByUser(user);

        List<SeaImage> bySpot = imageRepository.findBySpot(findSpotByUser);

        List<String> spotLocationList = new ArrayList<>();

        for (SeaImage seaImage : bySpot) {
            spotLocationList.add(seaImage.getImageName());
        }

        FishingSpotInfoResponseDTO fishingSpotInfoResponseDTO = FishingSpotInfoResponseDTO.builder()
                .spotImageLocation(spotLocationList)
                .spotDescription(findSpotByUser.getSpotDescription())
                .spotId(findSpotByUser.getSpotId())
                .spotName(findSpotByUser.getSpotName())
                .userName(findSpotByUser.getUser().getUserName())
                .category(findSpotByUser.getProductCategory())
                .spotLikeCount(findSpotByUser.getSpotHeartCount())
                .spotLocation(findSpotByUser.getSpotLocation())
                .build();

        return fishingSpotInfoResponseDTO;
    }
}
