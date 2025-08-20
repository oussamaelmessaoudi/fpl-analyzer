package com.fpl.fplanalyzer.model;


public class FplStats {
    private String managerName;
    private int currentRank;
    private int bestSeasonRank;
    private int seasonsPlayed;
    private String bestSeasonName;

    public FplStats(String managerName,int currentRank, int bestSeasonRank, int seasonsPlayed, String bestSeasonName) {
        this.managerName = managerName;
        this.currentRank = currentRank;
        this.bestSeasonRank = bestSeasonRank;
        this.seasonsPlayed = seasonsPlayed;
        this.bestSeasonName = bestSeasonName;
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
