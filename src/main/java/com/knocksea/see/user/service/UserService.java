package com.knocksea.see.user.service;

import com.knocksea.see.auth.TokenProvider;
import com.knocksea.see.user.dto.request.LoginRequestDTO;
import com.knocksea.see.user.dto.request.UserDeleteRequest;
import com.knocksea.see.user.dto.request.UserModifyRequestDTO;
import com.knocksea.see.user.dto.request.UserRegisterRequestDTO;
import com.knocksea.see.user.dto.response.LoginResponseDTO;
import com.knocksea.see.user.dto.response.UserModifyresponseDTO;
import com.knocksea.see.user.entity.User;
import com.knocksea.see.exception.DuplicatedEmailException;
import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserService {


    //리파지토리용
    private final UserRepository userRepository;
    //비밀번호 암호화용
    private final PasswordEncoder encoder;
    //토큰 인증용
    private final TokenProvider tokenProvider;

    @Value("${upload.path}")
    private String uploadRootPath;

    //회원가입 기능
    public boolean join(final UserRegisterRequestDTO dto, String uploadedFilePath) throws RuntimeException{

        if(dto==null){
            throw new NoRegisteredArgumentsException("가입 정보가 없습니다");
        }

        String email = dto.getUserEmail();
        if(userRepository.existsByUserEmail(email)){
            log.warn("이메일이 중복되었습니다. -{}",email);
            throw new DuplicatedEmailException("중복된 이메일입니다");
        }
        //중복되지 않았다면 ...
        //패스워드 인코딩
        String encode = encoder.encode(dto.getUserPassword());

        //회원 객체 비밀번호 인코딩된 비밀번호로 저장..
        dto.setUserPassword(encode);

        //dto를 엔티티로 변환
        User user = dto.toEntity(uploadedFilePath);


        //엔티티를 저장하고 리턴값 반환
        User saveuser = userRepository.save(user);


        log.info("회원가입 정상 수행됌! - saved user - {}",saveuser);

        //리턴값이 비어있지않다면 회원가입성공
        //비어있다면 회원가입 실패
        if(saveuser!=null){
            return true;
        }else{
            return false;
        }

    }

    //유저정보를 수정할 수 있다.
    public UserModifyresponseDTO modify(UserModifyRequestDTO dto) throws Exception {
        if(dto==null){
            throw new NoRegisteredArgumentsException("가입 정보가 없습니다");
        }

        //dto값이 비지않았다면...
        //dto에서 이메일 값 받아오기
        String email = dto.getUserEmail();


        //이메일로 유저정보 얻기 (이메일은 유일값이기때문에 ..)
        User founduser = userRepository.findByUserEmail(email).orElseThrow(() -> new Exception("회원정보 수정에 실패했습니다!"));

        //이메일로 찾은 객체에 dto에 수정하고자 하는 정보들을 뽑아서 새로 집어넣고 다시 저장해준다
        founduser.setUserAddress(dto.getUserAddress());
        founduser.setUserFullAddress(dto.getUserFullAddress());
        founduser.setUserPhone(dto.getUserPhone());
        founduser.setUserName(dto.getUsername());

        User modiftideuser = userRepository.save(founduser);

        return new UserModifyresponseDTO(modiftideuser);
    }

    public LoginResponseDTO authenticate(final LoginRequestDTO dto) {
        //이메일을 통해 회원정보 조회
        User user = userRepository.findByUserEmail(dto.getUserEmail()).orElseThrow(
                () -> new RuntimeException("가입된 회원이 아닙니다.")
        );

        //패스워드를 검증한다
        String rawPassword = dto.getUserPassword(); //입력비번
        String encodedPassword = user.getUserPassword(); //db저장 비번

        if (!encoder.matches(rawPassword,encodedPassword)){
            throw new RuntimeException("비밀번호가 틀렸습니다");
        }

        log.info("{}님 로그인 성공!!", user.getUserName());

        //로그인 성공 후에 클라이언트에 뭘 리턴할 것인가?
        //-> JWT를 클라이언트에게 발급해줘야 함.
        String token = tokenProvider.createToken(user);

        return new LoginResponseDTO(user, token);
    }

    //회원탈퇴 기능 구현
    public boolean deleteUser(UserDeleteRequest dto) {

        User user = userRepository.findById(dto.getUserId()).orElseThrow(
                () -> new RuntimeException("가입된 회원이 아닙니다.")
        );

        String encodedPassword = user.getUserPassword(); //db저장 비번
        if (!encoder.matches(dto.getUserPassword(),encodedPassword)){
            throw new RuntimeException("비밀번호가 일치하지않아 회원탈퇴를 진행할 수 없습니다");
        }

        userRepository.deleteById(dto.getUserId());
        return true;
    }

    //이메일 중복검사 코드
    public boolean isDuplicate(String email) {
        return userRepository.existsByUserEmail(email);
    }

    public String uploadProfileImage(MultipartFile originalFile) throws IOException {
        //루트 디렉토리가 존재하는지 확인후 존재하지않으면 생성하는 코드
        File rootDir = new File(uploadRootPath);
        if(!rootDir.exists()) rootDir.mkdir();

        //파일명을 유니크하게 변경
        String uniqueFileName = UUID.randomUUID() + "_" + originalFile.getOriginalFilename();

        //파일을 저장
        File uploadFile = new File(uploadRootPath + "/" + uniqueFileName);

        originalFile.transferTo(uploadFile);

        return uniqueFileName;
    }
    public String findProfilePath(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return uploadRootPath + "/" + user.getProfileImg();
    }
}
