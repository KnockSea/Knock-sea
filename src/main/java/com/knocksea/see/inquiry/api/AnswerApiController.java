package com.knocksea.see.inquiry.api;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.inquiry.dto.page.PageDTO;
import com.knocksea.see.inquiry.dto.request.AnswerCreateRequestDTO;
import com.knocksea.see.inquiry.dto.request.AnswerModifyDTO;
import com.knocksea.see.inquiry.dto.response.AnswerDetailResponseDTO;
import com.knocksea.see.inquiry.dto.response.AnswerListResponseDTO;
import com.knocksea.see.inquiry.entity.Inquiry;
import com.knocksea.see.inquiry.repository.InquiryRepository;
import com.knocksea.see.inquiry.service.AnswerService;
import com.knocksea.see.inquiry.service.InquiryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
  private final InquiryService inquiryService;

  @GetMapping("/{inquiryId}")
  public ResponseEntity<?> detail(
      @PathVariable Long inquiryId) {
    log.info("inquiryId - {}", inquiryId);
    AnswerDetailResponseDTO answerInfo = answerService.findByInquiry(inquiryId);
    log.info("answerInfo - {}", answerInfo);
    return ResponseEntity.ok().body(answerInfo);
  }

  @PostMapping("/makeAnswer")
  public ResponseEntity<?>create(
          @AuthenticationPrincipal TokenUserInfo userInfo,
          @Validated @RequestBody AnswerCreateRequestDTO dto
          , BindingResult result
  ) {
    log.info("AnswerCreateRequestDTO POST! :{}" , dto);

    if (dto == null) {
      return ResponseEntity
              .badRequest()
              .body("등록 답장 정보를 보내주세요!!");
    }
    ResponseEntity<List<FieldError>> fieldErrors = getValidatedResult(result);
    if (fieldErrors != null) return fieldErrors;

    try {
      AnswerDetailResponseDTO responseDTO = answerService.insert(dto, userInfo);
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

//  @RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH})
//  public ResponseEntity<?> update(
//          @AuthenticationPrincipal TokenUserInfo userInfo,
//          @Validated @RequestBody AnswerModifyDTO dto
//          , BindingResult result
//          , HttpServletRequest request
//  ) {
//
//    log.info("/api/v1/answers {}!! -  modify dto: {}"
//            , request.getMethod(), dto);
//
//    try {
//      AnswerDetailResponseDTO responseDTO = answerService.modify(dto, userInfo.getUserId());
//      return ResponseEntity
//              .ok(responseDTO);
//    } catch (Exception e) {
//      return ResponseEntity
//              .internalServerError()
//              .body(e.getMessage());
//    }
//  }
  @DeleteMapping("/{answerId}")
  public ResponseEntity<?> delete(
      @AuthenticationPrincipal TokenUserInfo userInfo,
          @PathVariable Long answerId
  ) {
    log.info("/api/v1/inquiries/{}  DELETE!! ", answerId);

    try {
      answerService.delete(answerId, userInfo.getUserId());
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