package com.knocksea.see.validation.service;

import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.UserRepository;
import com.knocksea.see.validation.dto.request.ValidationCreateDTO;
import com.knocksea.see.validation.dto.response.ValidationRegisterResponseDTO;
import com.knocksea.see.validation.entity.Validation;
import com.knocksea.see.validation.repository.ValidationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ValidationService {

    private final UserRepository userRepository;
    private final ValidationRepository validationRepository;


    public ValidationRegisterResponseDTO insert(final ValidationCreateDTO dto/*, TokenUserInfo userInfo*/) {
        log.info("{} 검증 정보 : ",dto);
        if (dto==null){
            throw new NoRegisteredArgumentsException("검증에서 필수로 입력해야 하는 정보가 없습니다");
        }

        /*User user = userRepository.findById(userInfo.getUserId()).orElseThrow(()->
                new RuntimeException("회원 정보가 없습니다"));*/

        User user = userRepository.findById(dto.getUserId()).orElseThrow(()->
                new RuntimeException("회원 정보가 없습니다"));

        log.info("validation userId : "+user);

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
}
