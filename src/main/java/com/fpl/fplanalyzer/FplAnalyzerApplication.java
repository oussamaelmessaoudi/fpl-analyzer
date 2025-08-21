package com.fpl.fplanalyzer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class FplAnalyzerApplication {

    public static void main(String[] args) {
        SpringApplication.run(FplAnalyzerApplication.class, args);
    }

}
