package com.fpl.fplanalyzer.service;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.fpl.fplanalyzer.client.FplApiClient;
import com.fpl.fplanalyzer.model.FplStats;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FplService {
    private final FplApiClient fplApiClient;

    @Autowired
    public FplService(FplApiClient fplApiClient) {
        this.fplApiClient = fplApiClient;
    }


    public FplStats getStats(int userId) {
        int sumOfRanks=0;
        JSONObject summary = fplApiClient.fetchUserSummary(userId);
        JSONObject history = fplApiClient.fetchUserHistory(userId);

        int currentRank = summary.optInt("summary_overall_rank",-1);
        String managerName = summary.optString("player_first_name",null)+" "+summary.optString("player_last_name",null);
        JSONArray seasons = history.optJSONArray("past");
        int bestSeasonRank = Integer.MAX_VALUE;
        int seasonsPlayed = 0;
        String bestSeasonName = "";

        if(seasons != null){
            seasonsPlayed = seasons.length();
            for(int i = 0;i < seasons.length();i++){
                JSONObject season = seasons.optJSONObject(i);
                int rank = season.optInt("rank");
                sumOfRanks += rank;
                if(rank < bestSeasonRank){
                    bestSeasonRank = rank;
                    bestSeasonName = season.optString("season_name");
                }
            }
        }
        if(bestSeasonRank == Integer.MAX_VALUE){
            bestSeasonRank = -1;
            bestSeasonName = "Not Found";
        }

        return new FplStats(managerName,currentRank,bestSeasonRank,seasonsPlayed,bestSeasonName,(double) sumOfRanks/seasonsPlayed);
    }
}
