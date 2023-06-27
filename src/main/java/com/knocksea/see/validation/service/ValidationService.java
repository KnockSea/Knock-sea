package com.knocksea.see.validation.service;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.UserRepository;
import com.knocksea.see.validation.dto.request.ValidationCreateDTO;
import com.knocksea.see.validation.dto.request.validationModifyRequestDTO;
import com.knocksea.see.validation.dto.response.ValidationListResponseDTO;
import com.knocksea.see.validation.dto.response.ValidationRegisterResponseDTO;
import com.knocksea.see.validation.entity.Validation;
import com.knocksea.see.validation.entity.ValidationStatus;
import com.knocksea.see.validation.entity.ValidationType;
import com.knocksea.see.validation.repository.ValidationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.knocksea.see.user.entity.UserGrade.OWNER;
import static com.knocksea.see.validation.entity.ValidationStatus.YES;
import static com.knocksea.see.validation.entity.ValidationType.SHIP;
import static com.knocksea.see.validation.entity.ValidationType.SPOT;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ValidationService {

    private final UserRepository userRepository;
    private final ValidationRepository validationRepository;


    public ValidationRegisterResponseDTO insert(final ValidationCreateDTO dto,/*, TokenUserInfo userInfo*/TokenUserInfo userInfo) {
        log.info("검증 정보 : {}",dto);
        if(dto.getValidationType().equals(SHIP)){
            if(dto.getValidationShipRegi()==null||dto.getValidationShipLicense()==null){
                throw new NoRegisteredArgumentsException("SHIP 검증에서 필수로 입력해야 하는 정보가 없습니다");
            }
        }
        else if (dto.getValidationType().equals(SPOT)){
            if(dto.getValidationBusinessRegi()==null){
                throw new NoRegisteredArgumentsException("SPOT 검증에서 필수로 입력해야 하는 정보가 없습니다");
            }
        }

        /* User user = userRepository.findById(userInfo.getUserId()).orElseThrow(()->
                new RuntimeException("회원 정보가 없습니다")); */

        User user = userRepository.findById(userInfo.getUserId()).orElseThrow(()->
                new RuntimeException("회원 정보가 없습니다"));

        //등록된 검증이 없다면 등록할 수 있게
        //유저 Id와 검증구분 동시에 사용
        Validation byUserAndValidationType = validationRepository.findByUserAndValidationType(user, dto.getValidationType());
        log.info("byUserAndValidationType : "+byUserAndValidationType);
        if(byUserAndValidationType==null){
            //dto를 entity로 변환
            Validation savedValidation = validationRepository.save(dto.toValidationEntity(user));
            log.info("savedValidation : "+savedValidation);
            return new ValidationRegisterResponseDTO(savedValidation);

        }else {
            throw new RuntimeException("이미 검증에 등록된 정보가 있습니다.");
        }
    }

    public List<ValidationListResponseDTO> findAllByType(ValidationType validationType
//            , TokenUserInfo userInfo
    )
    throws RuntimeException{
        log.info("validationType : "+" "+validationType);

//        if (!(userInfo.getUserGrade().equals("ADMIN"))) {
//            throw new RuntimeException("관리자 기능입니다.");
//        }
/*        User user = userRepository.findById(userId).orElseThrow(()->
                new RuntimeException("회원 정보가 없습니다"));*/

        List<Validation> validationList = validationRepository.findByValidationTypeAndValidationStatus(validationType);
        log.info("validationList SIZE : "+validationList.size());
        log.info("validationList : "+validationList);
        
        //entity를 dto로 변환해서 리턴해야 함
        List<ValidationListResponseDTO> collectValidation = validationList.stream().map(validation -> {
            ValidationListResponseDTO validationListResponseDTO = new ValidationListResponseDTO(validation);
            return validationListResponseDTO;
        }).collect(Collectors.toList());

        return collectValidation;
    }

    public ValidationStatus modifyStatus(validationModifyRequestDTO dto) {

        String userName = dto.getUserName();
        ValidationStatus validationStatus = dto.getValidationStatus();
        ValidationType validationType=dto.getValidationType();

        User user = userRepository.findByUserName(userName);
        Validation validation = validationRepository.findByUserAndValidationType(user, validationType);

        Validation save=null;
        if(validationStatus== YES){
            user.setUserGrade(OWNER);
            User userSaved = userRepository.save(user);
        }
        return changeValidationStatus(validation,dto);

    }

    //검증 상태 변경
    public ValidationStatus changeValidationStatus(Validation validation,validationModifyRequestDTO dto){
        validation.update(dto);
        Validation validationSaved = validationRepository.save(validation);
        return validationSaved.getValidationStatus();
    }

}