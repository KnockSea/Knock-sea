package com.knocksea.see.edu.service;

import com.knocksea.see.edu.dto.EduModifyDTO;
import com.knocksea.see.edu.dto.request.EduCreateDTO;
import com.knocksea.see.edu.dto.response.EduDetailResponseDTO;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.repository.EduRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class EduService {

    private final EduRepository eduRepository;

    //클래스 저장
    public EduDetailResponseDTO insert(final EduCreateDTO dto) throws RuntimeException{

        //entity로 변환해서 저장
        Edu saved = eduRepository.save(dto.toEntity());

//        return new EduDetailResponseDTO(saved);
        return null;
    }

    //클래스 수정
    private EduDetailResponseDTO modify(final EduModifyDTO dto) throws RuntimeException{

        //        return new EduDetailResponseDTO(saved);
        return null;
    }
}
