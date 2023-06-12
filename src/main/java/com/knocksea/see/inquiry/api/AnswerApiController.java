package com.knocksea.see.inquiry.api;

import com.knocksea.see.inquiry.dto.page.PageDTO;
import com.knocksea.see.inquiry.dto.request.AnswerCreateRequestDTO;
import com.knocksea.see.inquiry.dto.request.AnswerModifyDTO;
import com.knocksea.see.inquiry.dto.response.AnswerDetailResponseDTO;
import com.knocksea.see.inquiry.dto.response.AnswerListResponseDTO;
import com.knocksea.see.inquiry.service.AnswerService;
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
@RequestMapping("/api/v1/answers")
public class AnswerApiController {

  private final AnswerService answerService;

  @GetMapping
  public ResponseEntity<?> list(PageDTO pageDTO) {
    log.info("/api/v1/answers?page={}&size={}", pageDTO.getPage(), pageDTO.getSize());

    AnswerListResponseDTO dto = answerService.getAnswers(pageDTO);

    log.info("dto - {}", dto);

    return ResponseEntity.ok().body(dto);

  }

  @PostMapping
  public ResponseEntity<?>create(
      @Validated @RequestBody AnswerCreateRequestDTO dto
      , BindingResult result
      ) {
    log.info("AnswerCreateRequestDTO POST!");

    if (dto == null) {
      return ResponseEntity
          .badRequest()
          .body("등록 답장 정보를 보내주세요!!");
    }
    ResponseEntity<List<FieldError>> fieldErrors = getValidatedResult(result);
    if (fieldErrors != null) return fieldErrors;

    try {
      AnswerDetailResponseDTO responseDTO = answerService.insert(dto);
      return ResponseEntity
          .ok()
          .body(responseDTO);
    } catch (RuntimeException e) {
      e.printStackTrace();
      return ResponseEntity
          .internalServerError()
          .body("서버 터짐 원인: "+ e.getMessage());
    }
  }

  private static ResponseEntity<List<FieldError>> getValidatedResult(BindingResult result) {
    if (result.hasErrors()) { // 입력값 검증에 걸림
      List<FieldError> fieldErrors = result.getFieldErrors();
      fieldErrors.forEach(err -> {
        log.warn("invalid client data - {}", err.toString());
      });

      return ResponseEntity
          .badRequest()
          .body(fieldErrors);
    }
    return null;
  }

  @RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH})
  public ResponseEntity<?> update(
      @Validated @RequestBody AnswerModifyDTO dto
      , BindingResult result
      , HttpServletRequest request
  ) {

    log.info("/api/v1/answers {}!! -  modify dto: {}"
        , request.getMethod(), dto);

    try {
      AnswerDetailResponseDTO responseDTO = answerService.modify(dto);
      return ResponseEntity
          .ok(responseDTO);
    } catch (Exception e) {
      return ResponseEntity
          .internalServerError()
          .body(e.getMessage());
    }
  }
  @DeleteMapping("/{answerId}")
  public ResponseEntity<?> delete(
      @PathVariable Long answerId
  ) {
    log.info("/api/v1/inquiries/{}  DELETE!! ", answerId);

    try {
      answerService.delete(answerId);
      return ResponseEntity
          .ok("DEL SUCCESS!!");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity
          .internalServerError()
          .body(e.getMessage());
    }
  }
}
