package com.knocksea.see.filter;


import com.knocksea.see.auth.TokenProvider;
import com.knocksea.see.auth.TokenUserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

//클라이언트가 전송한 토큰을 검사하는 필터
@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {


    private final TokenProvider tokenProvider;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = parseBearerToken(request);

            log.info("Jwt Token Filter is running.... token : {}",token);
            //토큰 위조검사 및 인증완료 처리
            if(token!=null){
                //토큰 서명위조 검사와 토큰을 파싱해서 클레임을 얻어내는 작업
                TokenUserInfo tokenUserInfo = tokenProvider.validateAndGetTokenUserInfo(token);

                //인가 정보 리스트
                List<SimpleGrantedAuthority> authorityList = new ArrayList<>();

                authorityList.add(new SimpleGrantedAuthority(tokenUserInfo.getUserGrade().toString()));

                //인증완료 처리
                // - 스프링 시큐리티에게 인증정보를
                // 전달해서 전역적으로 앱에서
                //인증 정보를 활용할 수 있게 설정
                AbstractAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        tokenUserInfo, //컨트롤러에서 활용할 유저정보
                        null, //인증된 사용자의 비밀번호 - 보통 null값
                        authorityList // 인가정보(권한정보)
                );

                //인증완료 처리시 클라이언트의 요청정보 세팅
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                //스프링 시큐리티 컨테이너에 인증정보객체 등록
                SecurityContextHolder.getContext().setAuthentication(auth);


            }
        } catch (Exception e) {
//            e.printStackTrace();
            log.error("토큰이 위조되었습니다.");
        }

        //필터체인에 내가만든 필터 실행명령
        filterChain.doFilter(request,response);
    }

    private String parseBearerToken(HttpServletRequest request) {
        //요청 헤더에서 토큰 가져오기
        // http requset header
        // - Content-type : application/json
        // - Authorization : Bearere dasdasdasdkljflask#$j
        String bearerToken = request.getHeader("Authorization");

        //요청헤더에서 가져온 토큰은 순수토큰값이 아니라
        // 앞에 bearer가 붙어있으니 이것을 제거하는 작업
        if(StringUtils.hasText( bearerToken)
                &&  bearerToken.startsWith("Bearer")){
            return  bearerToken.substring(7);

        }

        return null;

    }
}
