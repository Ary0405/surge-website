
export type MultiPlayerEvent = {
    team1: string;
    team2: string;
    score1: number;
    score2: number;
    win: number;
    location: string;
    time: string;
}

export type SinglePlayerEvent = {
    time: string;
    gold: string;
    silver: string;
    bronze: string;
    name: string;
}

export type MatchData = Record<string, MultiPlayerEvent[] | SinglePlayerEvent[]>;

export const matchFixtures: MatchData = {
    "Cricket": [
        {
            team1: "Team 1",
            team2: "Team 2",
            score1: 100,
            score2: 90,
            win: 1,
            location: "Location 1",
            time: "2021-06-25T19:00:00"
        },
        {
            team1: "Team 3",
            team2: "Team 4",
            score1: 80,
            score2: 70,
            win: 2,
            location: "Location 2",
            time: "2021-06-26T19:00:00"
        },
        {
            team1: "Team 5",
            team2: "Team 6",
            score1: 70,
            score2: 80,
            win: 2,
            location: "Location 3",
            time: "2021-06-27T19:00:00"
        }
    ],
    "Basketball": [
        {
            team1: "Team 7",
            team2: "Team 8",
            score1: 70,
            score2: 80,
            win: 2,
            location: "Location 4",
            time: "2021-06-25T19:00:00"
        },
        {
            team1: "Team 9",
            team2: "Team 10",
            score1: 80,
            score2: 70,
            win: 1,
            location: "Location 5",
            time: "2021-06-26T19:00:00"
        },
        {
            team1: "Team 11",
            team2: "Team 12",
            score1: 100,
            score2: 90,
            win: 1,
            location: "Location 6",
            time: "2021-06-27T19:00:00"
        }
    ],
    "Athletics Men": [
        {
            time: "2021-06-25T19:00:00",
            gold: "Player 1",
            silver: "Player 2",
            bronze: "Player 3",
            name: "100m"
        },
        {
            time: "2021-06-26T19:00:00",
            gold: "Player 4",
            silver: "Player 5",
            bronze: "Player 6",
            name: "200m"
        },
        {
            time: "2021-06-27T19:00:00",
            gold: "Player 7",
            silver: "Player 8",
            bronze: "Player 9",
            name: "400m"
        }
    ],
    "Athletics Female": [
        {
            time: "2021-06-25T19:00:00",
            gold: "Player 10",
            silver: "Player 11",
            bronze: "Player 12",
            name: "100m"
        },
        {
            time: "2021-06-26T19:00:00",
            gold: "Player 13",
            silver: "Player 14",
            bronze: "Player 15",
            name: "200m"
        },
        {
            time: "2021-06-27T19:00:00",
            gold: "Player 16",
            silver: "Player 17",
            bronze: "Player 18",
            name: "400m",
        }
    ]
}