package com.knocksea.see.user.api;

import com.knocksea.see.exception.DuplicatedEmailException;
import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.user.dto.request.ShipRegisterRequestDTO;
import com.knocksea.see.user.dto.request.UserRegisterRequestDTO;
import com.knocksea.see.user.dto.response.ShipRegisterResponseDTO;
import com.knocksea.see.user.service.ShipService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/ship")
public class ShipApiController {

    private final ShipService shipService;

    //배 등록 요청
    //post : /api/v1/ship/register

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Validated @RequestBody ShipRegisterRequestDTO dto
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
            ShipRegisterResponseDTO join = shipService.join(dto);
            return ResponseEntity.ok().body(join);
        } catch (NoRegisteredArgumentsException e) {
            log.warn("필수 등록 정보를 받지 못했습니다.");
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (DuplicatedEmailException e) {
            log.warn("이메일이 중복되었습니다");
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

}
