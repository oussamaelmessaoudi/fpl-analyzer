package com.fpl.fplanalyzer.controller;

import com.fpl.fplanalyzer.exception.UserNotFoundException;
import com.fpl.fplanalyzer.model.FplStats;
import com.fpl.fplanalyzer.service.FplService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fpl")
public class FplController {
    private final FplService fplService;

    @Autowired
    public FplController(FplService fplService) {
        this.fplService = fplService;
    }

    @GetMapping("/{id}")
    public FplStats getStats(@PathVariable int id) {
        return fplService.getStats(id);
    }


}
