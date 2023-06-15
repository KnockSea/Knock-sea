package com.knocksea.see.inquiry.api;

import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.inquiry.dto.page.PageDTO;
import com.knocksea.see.inquiry.dto.request.InquiryCreateRequestDTO;
import com.knocksea.see.inquiry.dto.response.InquiryDetailResponseDTO;
import com.knocksea.see.inquiry.dto.response.InquiryListResponseDTO;
import com.knocksea.see.inquiry.dto.request.InquiryModifyDTO;
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
@RequestMapping("/api/v1/inquiries")
public class InquiryApiController {

    private final InquiryService inquiryService;

    @GetMapping
    public ResponseEntity<?> list(
        @AuthenticationPrincipal TokenUserInfo userInfo,
        PageDTO pageDTO) {
        log.info("/api/v1/inquiries?page={}&size={}", pageDTO.getPage(), pageDTO.getSize());

        InquiryListResponseDTO dto = inquiryService.getInquiries(pageDTO, userInfo.getUserId());

        log.info("dto - {}", dto);

        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/{inquiryId}")
    public ResponseEntity<?> detail(
        @AuthenticationPrincipal TokenUserInfo userInfo,
        @PathVariable Long inquiryId) {
        log.info("/api/v1/inquiries/{} GET", inquiryId);

        try {
            InquiryDetailResponseDTO dto = inquiryService.getDetail(inquiryId, userInfo.getUserId());
            return ResponseEntity.ok().body(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping
    public ResponseEntity<?> create(
            @AuthenticationPrincipal TokenUserInfo userInfo,
            @Validated @RequestBody InquiryCreateRequestDTO dto
            , BindingResult result
            ) {
        log.info("/api/v1/inquiries InquiryCreateRequestDTO POST!! - {}", dto);

        if (dto == null) {
            return ResponseEntity
                    .badRequest()
                    .body("등록 문의물 정보를 전달해주세요!!");
        }
        ResponseEntity<List<FieldError>> fieldErrors = getValidatedResult(result);
        if (fieldErrors != null) return  fieldErrors;

        try {
            InquiryDetailResponseDTO responseDTO = inquiryService.insert(dto, userInfo);
            return ResponseEntity
                    .ok()
                    .body(responseDTO);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity
                    .internalServerError()
                    .body("서버 터짐 원인: " + e.getMessage());
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
            @AuthenticationPrincipal TokenUserInfo userInfo,
            @Validated @RequestBody InquiryModifyDTO dto
            , BindingResult result
            , HttpServletRequest request
            ) {

        log.info("/api/v1/inquiries {}!! -  modify dto: {}"
                    , request.getMethod(), dto);

        try {
            InquiryDetailResponseDTO responseDTO = inquiryService.modify(dto, userInfo.getUserId());
            return ResponseEntity
                    .ok(responseDTO);
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/{inquiryId}")
    public ResponseEntity<?> delete(
            @AuthenticationPrincipal TokenUserInfo userInfo
            , @PathVariable Long inquiryId
    ) {
        log.info("/api/v1/inquiries/{}  DELETE!! ", inquiryId);

        try {
            inquiryService.delete(inquiryId, userInfo.getUserId());
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

