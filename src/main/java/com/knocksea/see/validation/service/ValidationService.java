package com.knocksea.see.validation.service;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.edu.dto.response.EduDetailResponseDTO;
import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.user.entity.Ship;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.repository.UserRepository;
import com.knocksea.see.validation.dto.ValidationCreateDTO;
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


    public EduDetailResponseDTO insert(final ValidationCreateDTO dto, TokenUserInfo userInfo) {
        log.info("{} 검증 정보 : ",dto);
        if (dto==null){
            throw new NoRegisteredArgumentsException("검증에서 필수로 입력해야 하는 정보가 없습니다");
        }

        User user = userRepository.findById(userInfo.getUserId()).orElseThrow(()->
                new RuntimeException("회원 정보가 없습니다"));

        //등록된 검증이 없다면 등록할 수 있게
        //유저 Id와 검증구분 동시에 사용
        validationRepository.findByUserAndValidationType(user,dto.getValidationType());



        return null;
    }
}
