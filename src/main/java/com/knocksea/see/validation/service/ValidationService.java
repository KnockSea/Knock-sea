package com.knocksea.see.validation.service;

import com.knocksea.see.edu.dto.response.EduDetailResponseDTO;
import com.knocksea.see.validation.dto.ValidationCreateDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ValidationService {


    public EduDetailResponseDTO insert(ValidationCreateDTO dto) {

        return null;
    }
}
