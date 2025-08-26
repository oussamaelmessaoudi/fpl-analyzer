package com.fpl.fplanalyzer.model;


import com.fpl.fplanalyzer.dto.SeasonChartDTO;

import java.util.ArrayList;

public class FplStats {
    private String managerName;
    private int currentRank;
    private int bestSeasonRank;
    private int seasonsPlayed;
    private String bestSeasonName;
    private double averageRank;
    private String codeCountry;
    private String teamName;
    private ArrayList<SeasonChartDTO> seasonHistory;
    private String memeberSince;
    public FplStats(String teamName,String managerName,int currentRank, int bestSeasonRank, int seasonsPlayed, String bestSeasonName, double averageRank, String codeCountry, ArrayList<SeasonChartDTO> seasonHistory,String memeberSince) {
        this.teamName = teamName;
        this.managerName = managerName;
        this.currentRank = currentRank;
        this.bestSeasonRank = bestSeasonRank;
        this.seasonsPlayed = seasonsPlayed;
        this.bestSeasonName = bestSeasonName;
        this.averageRank = averageRank;
        this.codeCountry = codeCountry;
        this.seasonHistory = seasonHistory;
        this.memeberSince = memeberSince;
    }

    public String getMemeberSince() {
        return memeberSince;
    }

    public void setMemeberSince(String memeberSince) {
        this.memeberSince = memeberSince;
    }

    public ArrayList<SeasonChartDTO> getSeasonHistory() {
        return seasonHistory;
    }

    public void setSeasonHistory(ArrayList<SeasonChartDTO> seasonHistory) {
        this.seasonHistory = seasonHistory;
    }

    public String getTeamName(){
        return teamName;
    }

    public void setTeamName(String teamName){
        this.teamName = teamName;
    }

    public String getCodeCountry(){
        return codeCountry;
    }

    public void setCodeCountry(String codeCountry){
        this.codeCountry = codeCountry;
    }

    public double getAverageRank() {
        return averageRank;
    }

    public void setAverageRank(double averageRank) {
        this.averageRank = averageRank;
    }
    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }
    public int getCurrentRank() {
        return currentRank;
    }

    public void setCurrentRank(int currentRank) {
        this.currentRank = currentRank;
    }

    public int getBestSeasonRank() {
        return bestSeasonRank;
    }

    public void setBestSeasonRank(int bestSeasonRank) {
        this.bestSeasonRank = bestSeasonRank;
    }

    public int getSeasonsPlayed() {
        return seasonsPlayed;
    }

    public void setSeasonsPlayed(int seasonsPlayed) {
        this.seasonsPlayed = seasonsPlayed;
    }

    public String getBestSeasonName() {
        return bestSeasonName;
    }

    public void setBestSeasonName(String bestSeasonName) {
        this.bestSeasonName = bestSeasonName;
    }
}
