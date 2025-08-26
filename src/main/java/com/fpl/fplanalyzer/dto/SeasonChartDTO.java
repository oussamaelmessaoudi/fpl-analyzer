package com.fpl.fplanalyzer.dto;

public class SeasonChartDTO {
    private String seasonName;
    private int totalPoints;
    private int rank;

    public SeasonChartDTO(String seasonName, int totalPoints, int rank) {
        this.seasonName = seasonName;
        this.totalPoints = totalPoints;
        this.rank = rank;
    }

    public String getSeasonName() {
        return seasonName;
    }
    public void setSeasonName(String seasonName) {
        this.seasonName = seasonName;
    }
    public int getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(int totalPoints) {
        this.totalPoints = totalPoints;
    }

    public int getRank() {
        return rank;
    }
    public void setRank(int rank) {
        this.rank = rank;
    }
}
