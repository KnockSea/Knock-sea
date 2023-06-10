package com.knocksea.see.user.api;

import com.knocksea.see.user.dto.request.UserModifyRequestDTO;
import com.knocksea.see.user.dto.request.UserRegisterRequestDTO;
import com.knocksea.see.user.dto.response.UserModifyresponseDTO;
import com.knocksea.see.exception.DuplicatedEmailException;
import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserApiController {


    //    @Value("${file.upload.root-path}")
//    private String rootPath;
    private final UserService userService;


    //이메일 중복확인 처리 요청


    //회원가입 요청
    //post : /api/v1/user/register
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Validated @RequestBody UserRegisterRequestDTO dto
            , BindingResult result) {
        //값 들어오는지 확인
        log.info("/user/register POST! --{}", dto);


//        String savePath = null;
//        if (!profileImage.isEmpty()) {
//            savePath = FileUtil.uploadFile(dto.getProfileImage(), rootPath);
//        }

        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldError());
        }
        try {
            boolean join = userService.join(dto);
            return ResponseEntity.ok().body(join);
        } catch (NoRegisteredArgumentsException e) {
            log.warn("필수 가입 정보를 받지 못했습니다.");
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (DuplicatedEmailException e) {
            log.warn("이메일이 중복되었습니다");
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    //회원 정보 수정 요청
    //post : /api/v1/user/modify
    @RequestMapping(value = "/modify", method = {RequestMethod.PUT, RequestMethod.PATCH})
    public ResponseEntity<?> modifyUser(@Validated @RequestBody UserModifyRequestDTO dto
            , BindingResult result) {
        //값 들어오는지 확인
        log.info("/user/modify POST! --{}", dto);
        if (result.hasErrors()) {
            log.warn(result.toString());
            return ResponseEntity.badRequest()
                    .body(result.getFieldError());
        }

        try {
            UserModifyresponseDTO modify = userService.modify(dto);
            return ResponseEntity.ok().body(modify);
        } catch (NoRegisteredArgumentsException e) {
            log.warn("필수 가입 정보를 받지 못했습니다.");
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
