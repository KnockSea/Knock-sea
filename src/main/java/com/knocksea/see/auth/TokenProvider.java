package com.knocksea.see.auth;


import com.knocksea.see.user.entity.User;
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
        claims.put("email", userEntity.getUserEmail());
        claims.put("grade", userEntity.getUserGrade());

        return Jwts.builder()
                //token header에 들어갈 서명
                .signWith(
                        Keys.hmacShaKeyFor(SECRET_KEY.getBytes())
                        , SignatureAlgorithm.HS512
                )
                //token payload에 들어갈 클레임 설정
                .setIssuer("강태공낚시커뮤니티") // iss : 발급자 정보
                .setIssuedAt(new Date())  // iat : 발급시간
                .setExpiration(expiry) //exp : 토큰 만료시간
                .setSubject(userEntity.getUserEmail()) // sub : 토큰을 식별할 수 있는 주요데이터
                .setClaims(claims)
                .compact();
    }
}