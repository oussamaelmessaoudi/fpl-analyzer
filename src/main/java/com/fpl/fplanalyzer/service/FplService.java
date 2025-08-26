package com.fpl.fplanalyzer.service;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.fpl.fplanalyzer.client.FplApiClient;
import com.fpl.fplanalyzer.dto.SeasonChartDTO;
import com.fpl.fplanalyzer.exception.UserNotFoundException;
import com.fpl.fplanalyzer.model.FplStats;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;


@Service
public class FplService {
    private final FplApiClient fplApiClient;
    private static final Logger logger = LoggerFactory.getLogger(FplService.class);

    @Autowired
    public FplService(FplApiClient fplApiClient) {
        this.fplApiClient = fplApiClient;
    }
    /*After enabling the chaching in the service layer, the result of the id searched will stored in the cache "fplStats" and will the the id as key
    * if the user asks for the stats of the same id the application will not request rom the API again but it will return
    * the cached stats of the same id*/
    @Cacheable("fplStats")
    public FplStats getStats(int userId)  {
        int sumOfRanks=0;
        logger.info("Fetching summary/history stats for user Id: {}",userId);
        JSONObject summary = fplApiClient.fetchUserSummary(userId);
        JSONObject history = fplApiClient.fetchUserHistory(userId);
        String countryCode = summary.optString("player_region_iso_code_short",null);
        String teamName = summary.optString("name",null);
            int currentRank = summary.optInt("summary_overall_rank",-1);
            String managerName = summary.optString("player_first_name",null)+" "+summary.optString("player_last_name",null);
            JSONArray seasons = history.optJSONArray("past");
            int bestSeasonRank = Integer.MAX_VALUE;
            int memberSince_ = Integer.MAX_VALUE;
            int seasonsPlayed = 0;
            String bestSeasonName = "";
            ArrayList<SeasonChartDTO> chartData = new ArrayList<>();
            if(seasons != null){
                seasonsPlayed = seasons.length();

                for(int i = 0;i < seasons.length();i++){
                    JSONObject season = seasons.optJSONObject(i);
                    chartData.add(new SeasonChartDTO(season.optString("season_name",null),season.optInt("total_points",0), season.optInt("rank",0)));
                    int rank = season.optInt("rank");
                    sumOfRanks += rank;
                    int currSeason = Integer.parseInt(season.optString("season_name").split("/")[0]);
                    memberSince_ = Math.min(currSeason,memberSince_);
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
            FplStats stats = new FplStats(teamName,managerName,currentRank,bestSeasonRank,seasonsPlayed,bestSeasonName,(double) sumOfRanks/seasonsPlayed,countryCode,chartData,String.valueOf(memberSince_));
        logger.debug("Parsed stats {}",stats);

        return stats;


    }
}
