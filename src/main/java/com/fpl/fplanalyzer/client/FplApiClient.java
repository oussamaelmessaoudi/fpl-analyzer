package com.fpl.fplanalyzer.client;
import com.fpl.fplanalyzer.exception.UserNotFoundException;
import com.fpl.fplanalyzer.model.FplStats;
import com.fpl.fplanalyzer.service.FplService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

@Component
public class FplApiClient {
    private final RestTemplate restTemplate = new RestTemplate();

    public JSONObject fetchUserSummary(int userId)  {
        String url = "https://fantasy.premierleague.com/api/entry/"+userId;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return new JSONObject(response.getBody());
    }

    public JSONObject fetchUserHistory(int userId){
        String url = "https://fantasy.premierleague.com/api/entry/"+userId+"/history";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return new JSONObject(response.getBody());
    }
}
