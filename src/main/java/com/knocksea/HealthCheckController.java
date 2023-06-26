package com.knocksea;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class HealthCheckController {
    @GetMapping("/")
    public ResponseEntity<?> healthcheck(){
        log.info("server is running ....i'm healthy!");
        return ResponseEntity.ok().body("it's OK");
    }
}
