package com.knocksea.see.validation.service;

import com.knocksea.see.edu.dto.response.EduDetailResponseDTO;
import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.entity.UserGrade;
import com.knocksea.see.user.repository.UserRepository;
import com.knocksea.see.validation.dto.request.ValidationCreateDTO;
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

import static com.knocksea.see.validation.entity.ValidationStatus.*;
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


    public ValidationRegisterResponseDTO insert(final ValidationCreateDTO dto/*, TokenUserInfo userInfo*/) {
        log.info("검증 정보 : ",dto);
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

        User user = userRepository.findById(dto.getUserId()).orElseThrow(()->
                new RuntimeException("회원 정보가 없습니다"));

        //등록된 검증이 없다면 등록할 수 있게
        //유저 Id와 검증구분 동시에 사용
        List<Validation> byUserAndValidationType = validationRepository.findByUserAndValidationType(user, dto.getValidationType());
        log.info("byUserAndValidationType : "+byUserAndValidationType);
        if(byUserAndValidationType.isEmpty()){
            //dto를 entity로 변환
            Validation savedValidation = validationRepository.save(dto.toValidationEntity(user));
            log.info("savedValidation : "+savedValidation);
            return new ValidationRegisterResponseDTO(savedValidation);

        }else {
            throw new RuntimeException("이미 검증에 등록된 정보가 있습니다.");
        }
    }

    public List<ValidationListResponseDTO> findAllByType(ValidationType validationType) {
        log.info("validationType : "+" "+validationType);

/*        User user = userRepository.findById(userId).orElseThrow(()->
                new RuntimeException("회원 정보가 없습니다"));*/

        List<Validation> validationList = validationRepository.findByValidationType(validationType);
        log.info("validationList SIZE : "+validationList.size());
        log.info("validationList : "+validationList);
        
        //entity를 dto로 변환해서 리턴해야 함
        List<ValidationListResponseDTO> collectValidation = validationList.stream().map(validation -> {
            ValidationListResponseDTO validationListResponseDTO = new ValidationListResponseDTO(validation);
            return validationListResponseDTO;
        }).collect(Collectors.toList());

        return collectValidation;
    }

    public EduDetailResponseDTO modifyStatus(String userName, ValidationStatus validationStatus) {

        User user = userRepository.findByUserName(userName);
        Validation validation = validationRepository.findByUser_UserId(user.getUserId());

        //validationStatus이 YES
        //validationStatus이 NO

        if(validationStatus== YES){ //=> UserGrade를 OWNER로, ValidationType YES로 변경

        }else if(validationStatus== NO){ //=>  validationStatus NO로 변경

        }


        return null;
    }
}