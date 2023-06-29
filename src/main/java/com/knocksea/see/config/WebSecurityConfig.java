package com.knocksea.see.config;

import com.knocksea.see.filter.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;




    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .cors()
                .and()
                .csrf().disable()
                .httpBasic().disable()
                //세션 인증을 사용하지않겠다
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                //어딴 요청에서 인증을 안할 것인지 설정, 언제 할 것인지 설정
                .antMatchers("/").permitAll()
                .antMatchers("/health-check").permitAll()
                .antMatchers(HttpMethod.GET,"/api/v1/products").permitAll()
                .antMatchers("/api/v1/products/{productId}").permitAll()
                .antMatchers("/api/v1/products/product-list").permitAll()
                .antMatchers("/api/v1/products/main/ship").permitAll()
                .antMatchers("/api/v1/products/main/spot").permitAll()
                .antMatchers("/api/v1/products/remove/{productId}").permitAll()
                .antMatchers("/api/v1/user/register").permitAll()
                .antMatchers("/api/v1/user/signin").permitAll()
                .antMatchers("/api/v1/user/check").permitAll()
                .antMatchers("/api/v1/validation/{validationType}").permitAll()
                .antMatchers("/api/v1/validation").permitAll()

//                .antMatchers("/api/v1/edu/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/v1/edu").permitAll()
                .antMatchers(HttpMethod.GET, "/api/v1/edu/main/edu").permitAll()
                .antMatchers(HttpMethod.GET, "/api/v1/edu/topFour").permitAll()
                .antMatchers("/api/v1/edu/{eduId}").permitAll()
                .antMatchers("/api/v1/edu/main/edu").permitAll()
                .antMatchers(HttpMethod.GET,"/api/v1/inquiries").permitAll()
                .antMatchers(HttpMethod.GET,"/api/v1/inquiries/{inquiryId}").permitAll()
                .antMatchers(HttpMethod.GET,"/api/v1/answers/{inquiryId}").permitAll()
                .antMatchers(HttpMethod.GET,"/api/v1/reviews").permitAll()
                .antMatchers("/api/v1/hearts").permitAll()
                .antMatchers("/api/v1/hearts/exists").permitAll()
                .antMatchers("/api/v1/hearts/eduHeart").permitAll()
                .anyRequest().authenticated()
        ;

        http.addFilterAfter(
                jwtAuthFilter
                , CorsFilter.class // import주의: 스프링꺼
        );

        return http.build();
    }
}