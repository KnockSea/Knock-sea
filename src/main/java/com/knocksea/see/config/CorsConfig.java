package com.knocksea.see.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//전역 크로스 오리진 설정
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry
                .addMapping("/api/**") //어떤 요청에 대해서 허용할 것인가
                .allowedOrigins("http://localhost:3000") //어떤클라이언트를 허용할지
                .allowedMethods("*") //어떤요청방식을 허용할지
                .allowedHeaders("*") //어떤 요청헤더를 허용할지
                .allowCredentials(true) //쿠키 전달을 허용할 것인지
                .maxAge(3600) //캐싱시간을 설정
        ;
    }
}