package com.knocksea.see.auth;


import com.knocksea.see.user.entity.User;
import com.knocksea.see.user.entity.UserGrade;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
//역할 : 토큰을 발급하고, 서명위조를 검사하는 객체

@Component
@Slf4j
public class TokenProvider {
    //서명에 사용할 값(512바이트 이상의 랜덤 문자열)
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    //토큰 발급 메서드
    /*
     * json wqb token을 생성하는 메서드
     * @param userEntity - 토큰의 내용(클레임)에 포함될 유저정보
     * @return - 생성된 json을 암호화한 토큰값
     * */
    public String createToken(User userEntity){
        // 토큰 만료시간 생성
        Date expiry = Date.from(
                Instant.now().plus(1, ChronoUnit.DAYS)
        );

        //토큰 생성
        /*
         * {
         *   "iss" : "유저",
         *   "exp" : "2023-07-12",
         *   "iat" : "2023-06-12",
         *   "email" : "로그인한사람이메일",
         *   "role" : "Premium",
         *           .
         *           .
         *           .
         *   = 서명
         * }*/

        //추가 클레임 정의
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userEntity.getUserId());
        claims.put("userEmail", userEntity.getUserEmail());
        claims.put("userGrade", userEntity.getUserGrade().toString());
        claims.put("userPhone",userEntity.getUserPhone());
        claims.put("userName",userEntity.getUserName());

        return Jwts.builder()
                //token header에 들어갈 서명
                .signWith(
                        Keys.hmacShaKeyFor(SECRET_KEY.getBytes())
                        , SignatureAlgorithm.HS512
                )
                //token payload에 들어갈 클레임 설정
                .setClaims(claims) //추가 클레임은 먼저 설정해야함
                .setIssuer("강태공낚시커뮤니티") // iss : 발급자 정보
                .setIssuedAt(new Date())  // iat : 발급시간
                .setExpiration(expiry) //exp : 토큰 만료시간
                .setSubject(String.valueOf(userEntity.getUserId())) // sub : 토큰을 식별할 수 있는 주요데이터
                .compact();
    }

    /*
     * 클라이언트가 전송한 토큰을 디코딩하여 토큰의 위조 여부를 확인
     * 토큰을 json으로 파싱하여 클레임(토큰정보)를 리턴
     * @param token
     * @return - 토큰 안에있는 인증된 유저정보를 반환
     * */
    public TokenUserInfo validateAndGetTokenUserInfo(String token){
        //해체용 빌더
        Claims claims = Jwts.parserBuilder()
                //토큰 발급자의 발급 당시의 서명
                .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                //서명 위조 검사 : 위조된 경우 예외가 발생합니다.
                //위조가 되지않은 경우 페이로드(클레임)을 리턴
                .build()
                .parseClaimsJws(token)
                .getBody();

        log.info("claims : {}",claims);

        TokenUserInfo build = TokenUserInfo.builder().userId(Long.valueOf(claims.getSubject()))
                .userEmail(claims.get("userEmail", String.class))
                .userPhone(claims.get("userPhone", String.class))
                .userName((String) claims.get("userName"))
                .userGrade(UserGrade.valueOf(claims.get("userGrade", String.class))).build();
        return build;
    }

}
