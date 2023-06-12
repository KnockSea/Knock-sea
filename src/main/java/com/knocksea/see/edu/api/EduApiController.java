package com.knocksea.see.edu.api;

import com.knocksea.see.edu.dto.request.EduCreateDTO;
import com.knocksea.see.edu.dto.response.EduDetailResponseDTO;
import com.knocksea.see.edu.service.EduService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/edu")
public class EduApiController {

    private final EduService eduService;

    //클래스 등록 - post
    @PostMapping
    public ResponseEntity<?> create(
            @Validated @RequestBody EduCreateDTO dto, BindingResult result
    ){
        log.info("/api/v1/edu POST!! - payload: {}", dto);

        if(dto==null){
            return ResponseEntity
                    .badRequest()
                    .body("클래스 정보가 없습니다. 클래스 정보를 전달해주세요");
        }

        if(result.hasErrors()){
            List<FieldError> fieldErrors = result.getFieldErrors();
            fieldErrors.forEach(err->{
                log.warn("입력값 검증에 걸림. 클라이언트 데이터 유효하지 않음 - {}", err.toString());
            });

            return ResponseEntity
                    .badRequest()
                    .body(fieldErrors);
        }
        try {
            EduDetailResponseDTO responseDTO = eduService.insert(dto);
            return ResponseEntity
                    .ok()
                    .body(responseDTO);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .internalServerError()
                    .body("서버 터짐: " + e.getMessage());
        }
    }



}
