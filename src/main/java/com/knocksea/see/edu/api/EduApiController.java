package com.knocksea.see.edu.api;

import com.knocksea.see.edu.dto.response.EduListResponseDTO;
import com.knocksea.see.edu.dto.response.EduModifyDTO;
import com.knocksea.see.edu.dto.request.EduAndReservationTimeCreateDTO;
import com.knocksea.see.edu.dto.response.EduDetailResponseDTO;
import com.knocksea.see.edu.dto.response.EduTopFourListResponseDTO;
import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.edu.service.EduService;
import com.knocksea.see.inquiry.dto.page.PageDTO;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/edu")
public class EduApiController {

    private final EduService eduService;

    //좋아요 많은 순 4개 조회
    @GetMapping("/topFour")
    public ResponseEntity<?> topFourList(){
        log.info("/api/v1/edu topFourList");

        EduTopFourListResponseDTO topFourDto = eduService.findTopFour();

        return ResponseEntity
                .ok()
                .body(topFourDto);
    }
    
    //전체 조회
    @GetMapping
    public ResponseEntity<?> list(PageDTO pageDTO){
        log.info("/api/v1/posts?edu={}&size={}",pageDTO.getPage(),pageDTO.getSize());

        EduListResponseDTO dto = eduService.getAllEdu(pageDTO);

        return ResponseEntity
                .ok()
                .body(dto);

    }
    
    //개별 조회
    @GetMapping("/{eduId}")
    public ResponseEntity<?> detail(@PathVariable Long eduId){
        log.info("/api/v1/edu/{} GET",eduId);

        try {
            EduDetailResponseDTO dto = eduService.getDetail(eduId);

            return ResponseEntity.ok().body(dto);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    //클래스 등록 - post
    @PostMapping
    public ResponseEntity<?> create(
            @Validated @RequestBody EduAndReservationTimeCreateDTO dto, BindingResult result
    ){
        log.info("/api/v1/edu POST!! - payload: {}", dto);

        if(dto==null){
            return ResponseEntity
                    .badRequest()
                    .body("클래스 정보가 없습니다. 클래스 정보를 전달해주세요");
        }

        //입력값 검증
        ResponseEntity<List<FieldError>> fieldErros = getValidatedResult(result);
        if(fieldErros!=null) return fieldErros;

        try {
            EduDetailResponseDTO responseDTO = eduService.insert(dto);
            return ResponseEntity
                    .ok()
                    .body(responseDTO+" 저장 성공");
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity
                    .internalServerError()
                    .body("서버 터짐: " + e.getMessage());
        }
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

    //클래스 수정
    @RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH})
    public ResponseEntity<?> update(
            @Validated @RequestBody EduAndReservationTimeCreateDTO dto/*EduModifyDTO dto*/
            , BindingResult result
            , HttpServletRequest request
    ) {
        log.info("클래스 수정");
        log.info("/api/v1/edu {}!! - dto: {}", request.getMethod(), dto);

        //입력값 검증
//        ResponseEntity<List<FieldError>> fieldErros = getValidatedResult(result);
//        if(fieldErros!=null) return fieldErros;

        try {
            EduDetailResponseDTO responseDTO
                    = eduService.modify(dto);
            log.info("123dflkgja;oijfo222222");
            return ResponseEntity.ok().body(responseDTO);
        }
        catch (Exception e){
            return ResponseEntity
                    .internalServerError()
                    .body(e.getMessage());
        }
    }

    //게시물 삭제
    @DeleteMapping("/{eduId}")
    public ResponseEntity<?> delete(@PathVariable Long eduId){
        log.info("/api/v1/posts DELETE!! ");

        try {
            eduService.delete(eduId);
            return ResponseEntity
                    .ok("DEL SUCCESS!!");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .internalServerError()
                    .body(e.getMessage());
        }
    }
}
