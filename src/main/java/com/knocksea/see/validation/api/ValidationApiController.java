package com.knocksea.see.validation.api;

import com.knocksea.see.edu.dto.request.EduAndReservationTimeCreateDTO;
import com.knocksea.see.validation.dto.ValidationCreateDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/validation")
public class ValidationApiController {

    @PostMapping
    public ResponseEntity<?> create(
            @Validated @RequestBody ValidationCreateDTO dto, BindingResult result
    ){
        log.info("/api/v1/validation POST!!: {}", dto);

        if(dto==null){
            return ResponseEntity
                    .badRequest()
                    .body("검증 정보가 없습니다. 검증 정보를 전달해주세요!");
        }

        //입력값 검증
        ResponseEntity<List<FieldError>> fieldErros = getValidatedResult(result);
        if(fieldErros!=null) return fieldErros;

        return null;
    }

    //입력값 검증
    private static ResponseEntity<List<FieldError>> getValidatedResult(BindingResult result){
        if(result.hasErrors()){
            List<FieldError> fieldErrors = result.getFieldErrors();
            fieldErrors.forEach(err->{
                log.warn("입력값 검증에 걸림. 클라이언트 데이터 유효하지 않음 - {}", err.toString());
            });

            return ResponseEntity
                    .badRequest()
                    .body(fieldErrors);
        }
        return null;
    }



}
