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
    "Badminton - Men": [
        {
            team1: "GBU",
            team2: "Maharshi",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T10:00:00",
            win: 0
        },
        {
            team1: "Maharshi",
            team2: "BML",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T15:00:00",
            win: 0
        },
        {
            team1: "GBU",
            team2: "BML",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-16T09:30:00",
            win: 0
        },
        {
            team1: "JIIT",
            team2: "SGGSCC",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T11:30:00",
            win: 0
        },
        {
            team1: "SGGSCC",
            team2: "Ashoka",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T15:30:00",
            win: 0
        },
        {
            team1: "Ashoka",
            team2: "JIIT",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-16T10:00:00",
            win: 0
        },
        {
            team1: "SNU B",
            team2: "Jamia",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-16T11:00:00",
            win: 0
        },
        {
            team1: "SNU B",
            team2: "JSS Noida",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-15T16:30:00",
            win: 0
        },
        {
            team1: "Jamia",
            team2: "JSS Noida",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-15T11:30:00",
            win: 0
        },
        {
            team1: "Galgoatias",
            team2: "SNU A",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-15T15:00:00",
            win: 0
        },
        {
            team1: "SNU A",
            team2: "IARI",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-16T09:30:00",
            win: 0
        },
        {
            team1: "Galgoatias",
            team2: "IARI",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-15T10:00:00",
            win: 0
        },
        {
            team1: "Venky",
            team2: "Bennett B",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T11:30:00",
            win: 0
        },
        {
            team1: "Bennett B",
            team2: "SRCC",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T16:30:00",
            win: 0
        },
        {
            team1: "SRCC",
            team2: "Venky",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-16T11:00:00",
            win: 0
        },
        {
            team1: "UPES",
            team2: "Bennett A",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T12:00:00",
            win: 0
        },
        {
            team1: "Bennett A",
            team2: "GEC",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T17:00:00",
            win: 0
        },
        {
            team1: "GEC",
            team2: "UPES",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-16T11:30:00",
            win: 0
        }
    ],
    "Badminton - Women": [
        {
            team1: "GBU",
            team2: "JIIT",
            score1: 0,
            score2: 0,
            location: "Court 3",
            time: "2024-11-15T11:30:00",
            win: 0
        },
        {
            team1: "JIIT",
            team2: "SNU",
            score1: 0,
            score2: 0,
            location: "Court 3",
            time: "2024-11-15T16:30:00",
            win: 0
        },
        {
            team1: "SNU",
            team2: "GBU",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-16T15:00:00",
            win: 0
        },
        {
            team1: "Ashoka B",
            team2: "Galgoatias",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-15T12:30:00",
            win: 0
        },
        {
            team1: "Galgoatias",
            team2: "SRCC",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-15T17:30:00",
            win: 0
        },
        {
            team1: "SRCC",
            team2: "Ashoka B",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-16T16:00:00",
            win: 0
        },
        {
            team1: "Shaheed Sukdhev",
            team2: "Ashoka A",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T17:30:00",
            win: 0
        },
        {
            team1: "Ashoka A",
            team2: "Bennett A",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-16T15:00:00",
            win: 0
        },
        {
            team1: "Shaheed Sukdhev",
            team2: "Bennett A",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T12:30:00",
            win: 0
        },
        {
            team1: "IARI",
            team2: "UPES",
            score1: 0,
            score2: 0,
            location: "Court 3",
            time: "2024-11-15T12:30:00",
            win: 0
        },
        {
            team1: "UPES",
            team2: "GEC",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T18:00:00",
            win: 0
        },
        {
            team1: "GEC",
            team2: "IARI",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-16T16:00:00",
            win: 0
        }
    ],
    "Basketball - Men": [
        {
            team1: "SRCC",
            team2: "Motilal Nehru",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 1",
            time: "2024-11-15T19:00:00"
        },
        {
            team1: "Motilal Nehru",
            team2: "Ramjas",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Minimart",
            time: "2024-11-16T09:00:00"
        },
        {
            team1: "Ramjas",
            team2: "SRCC",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 1",
            time: "2024-11-16T10:00:00"
        },
        {
            team1: "Hansraj A",
            team2: "Jamia",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 1",
            time: "2024-11-15T19:00:00"
        },
        {
            team1: "Jamia",
            team2: "KMC",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 1",
            time: "2024-11-16T10:00:00"
        },
        {
            team1: "KMC",
            team2: "Hansraj A",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 1",
            time: "2024-11-15T12:00:00"
        },
        {
            team1: "CVS",
            team2: "SNU A",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 1",
            time: "2024-11-15T11:00:00"
        },
        {
            team1: "SNU A",
            team2: "BML",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 1",
            time: "2024-11-15T20:00:00"
        },
        {
            team1: "CVS",
            team2: "BML",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Minimart",
            time: "2024-11-15T16:00:00"
        },
        {
            team1: "VIPS",
            team2: "Bennett B",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Minimart",
            time: "2024-11-15T11:00:00"
        },
        {
            team1: "Bennett B",
            team2: "SNU ALUMNI",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 1",
            time: "2024-11-16T11:00:00"
        },
        {
            team1: "SNU ALUMNI",
            team2: "VIPS",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 1",
            time: "2024-11-15T18:00:00"
        },
        {
            team1: "JIIT",
            team2: "Hansraj B",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 1",
            time: "2024-11-15T15:00:00"
        },
        {
            team1: "Hansraj B",
            team2: "SNU B",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 1",
            time: "2024-11-16T12:00:00"
        },
        {
            team1: "SNU B",
            team2: "JIIT",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 2",
            time: "2024-11-15T17:00:00"
        },
        {
            team1: "UPES",
            team2: "Bennett A",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 1",
            time: "2024-11-15T10:00:00"
        },
        {
            team1: "Bennett A",
            team2: "Venky",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 1",
            time: "2024-11-16T09:00:00"
        },
        {
            team1: "Venky",
            team2: "UPES",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 1",
            time: "2024-11-16T15:00:00"
        },
        {
            team1: "Shaheed Bhagat",
            team2: "NIIT",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 1",
            time: "2024-11-15T16:00:00"
        },
        {
            team1: "Ashoka",
            team2: "IIIT D",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Minimart",
            time: "2024-11-15T15:00:00"
        },
    ],
    "Basketball - Women": [
        {
            team1: "SNU A",
            team2: "Bennett",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 2",
            time: "2024-11-16T10:00:00"
        },
        {
            team1: "Bennett",
            team2: "JIIT",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 2",
            time: "2024-11-16T15:00:00"
        },
        {
            team1: "JIIT",
            team2: "SNU A",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 2",
            time: "2024-11-15T19:00:00"
        },
        {
            team1: "Ashoka",
            team2: "Jamia",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 2",
            time: "2024-11-15T11:00:00"
        },
        {
            team1: "Jamia",
            team2: "Hindu",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 2",
            time: "2024-11-15T16:00:00"
        },
        {
            team1: "Hindu",
            team2: "Ashoka",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 2",
            time: "2024-11-16T11:00:00"
        },
        {
            team1: "GBU",
            team2: "BML",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 2",
            time: "2024-11-15T20:00:00"
        },
        {
            team1: "BML",
            team2: "SRM",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 2",
            time: "2024-11-16T09:00:00"
        },
        {
            team1: "SRM",
            team2: "GBU",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 2",
            time: "2024-11-15T15:00:00"
        },
        {
            team1: "GGSIPU",
            team2: "Amity",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 2",
            time: "2024-11-15T12:00:00"
        },
        {
            team1: "Amity",
            team2: "SNU Alumni",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 2",
            time: "2024-11-15T17:00:00"
        },
        {
            team1: "SNU Alumni",
            team2: "GGSIPU",
            score1: 0,
            score2: 0,
            win: 0,
            location: "DH2 2",
            time: "2024-11-16T12:00:00"
        }
    ],
    "Cricket - Men": [
        {
            team1: "SNU A",
            team2: "Jaypee",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Cricket Ground",
            time: "2024-11-14T15:00:00"
        },
        {
            team1: "JECRC",
            team2: "BML",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Cricket Ground",
            time: "2024-11-15T17:30:00"
        },
        {
            team1: "Ashoka",
            team2: "Galgotias",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Cricket Ground",
            time: "2024-11-14T11:30:00"
        },
        {
            team1: "SNU B",
            team2: "GL Bajaj",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Cricket Ground",
            time: "2024-11-14T20:00:00"
        },
        {
            team1: "UPES",
            team2: "Venky",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Cricket Ground",
            time: "2024-11-15T09:00:00"
        },
        {
            team1: "Amity",
            team2: "Jamia",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Cricket Ground",
            time: "2024-11-15T15:00:00"
        },
        {
            team1: "Manipal",
            team2: "SGGSCC",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Cricket Ground",
            time: "2024-11-14T17:30:00"
        },
        {
            team1: "Bennett",
            team2: "OP Jindal",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Cricket Ground",
            time: "2024-11-15T11:30:00"
        }
    ],
    "Cricket - Women": [
        {
            team1: "Jamia Hamdard",
            team2: "NIET",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Cricket Ground",
            time: "2024-11-15T09:30:00"
        },
        {
            team1: "SNU",
            team2: "Jamia Hamdard",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Cricket Ground",
            time: "2024-11-15T13:30:00"
        },
        {
            team1: "NIET",
            team2: "IGDTU",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Cricket Ground",
            time: "2024-11-15T15:30:00"
        },
        {
            team1: "SNU",
            team2: "NIET",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Cricket Ground",
            time: "2024-11-15T11:30:00"
        },
        {
            team1: "Jamia Hamdard",
            team2: "IGDTU",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Cricket Ground",
            time: "2024-11-16T12:30:00"
        },
        {
            team1: "SNU",
            team2: "IGDTU",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Cricket Ground",
            time: "2024-11-16T10:30:00"
        }
    ],
    "Football - Men": [
        {
            team1: "JSS Noida",
            team2: "JIIT",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T10:00:00"
        },
        {
            team1: "JIIT",
            team2: "SNU A",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-14T20:30:00"
        },
        {
            team1: "SNU A",
            team2: "JSS Noida",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T19:30:00"
        },
        {
            team1: "Amity",
            team2: "SRCC",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T09:00:00"
        },
        {
            team1: "SRCC",
            team2: "Venky",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-14T12:00:00"
        },
        {
            team1: "Venky",
            team2: "Amity",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-16T12:00:00"
        },
        {
            team1: "NFSU",
            team2: "B R Ambedkar",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-14T16:00:00"
        },
        {
            team1: "B R Ambedkar",
            team2: "Bhagat Singh",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T18:30:00"
        },
        {
            team1: "Bhagat Singh",
            team2: "NFSU",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T13:00:00"
        },
        {
            team1: "UPES",
            team2: "BML",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T12:00:00"
        },
        {
            team1: "BML",
            team2: "VIT Bhopal",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-16T11:00:00"
        },
        {
            team1: "UPES",
            team2: "VIT Bhopal",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T20:30:00"
        },
        {
            team1: "SNU B",
            team2: "SGGSCC",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-14T19:30:00"
        },
        {
            team1: "GL Bajaj",
            team2: "Bennett",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T17:00:00"
        },
        {
            team1: "Bennett",
            team2: "Ashoka",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T11:00:00"
        },
        {
            team1: "Ashoka",
            team2: "GL Bajaj",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-14T11:00:00"
        },
        {
            team1: "Jindal",
            team2: "Hansraj",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-16T09:00:00"
        },
        {
            team1: "Hansraj",
            team2: "Motilal",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-14T13:00:00"
        },
        {
            team1: "Motilal",
            team2: "Jindal",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T15:00:00"
        },
        {
            team1: "Apeejay",
            team2: "Aryabhatta",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T16:00:00"
        },
        {
            team1: "Aryabhatta",
            team2: "GBU",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-14T17:00:00"
        },
        {
            team1: "GBU",
            team2: "Apeejay",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-16T10:00:00"
        }
    ],
    "Futsal - Women": [
        {
            team1: "SNU B",
            team2: "KNC",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T12:20:00"
        },
        {
            team1: "Ashoka Red",
            team2: "KNC",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T19:00:00"
        },
        {
            team1: "Ashoka Red",
            team2: "SNU B",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T17:00:00"
        },
        {
            team1: "KNC",
            team2: "OP Jindal",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T16:20:00"
        },
        {
            team1: "OP Jindal",
            team2: "JMC",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T18:20:00"
        },
        {
            team1: "SNU B",
            team2: "JMC",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-16T17:40:00"
        },
        {
            team1: "Ashoka Red",
            team2: "OP Jindal",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-16T10:00:00"
        },
        {
            team1: "JMC",
            team2: "KNC",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-16T16:20:00"
        },
        {
            team1: "JMC",
            team2: "Ashoka Red",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-16T11:20:00"
        },
        {
            team1: "OP Jindal",
            team2: "SNU B",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-16T15:40:00"
        },
        {
            team1: "SNU A",
            team2: "BML",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-16T15:00:00"
        },
        {
            team1: "Ashoka Blue",
            team2: "UPES",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T11:40:00"
        },
        {
            team1: "UPES",
            team2: "SNU A",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T17:40:00"
        },
        {
            team1: "Ashoka Blue",
            team2: "Amity Noida",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T15:00:00"
        },
        {
            team1: "UPES",
            team2: "BML",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T15:40:00"
        },
        {
            team1: "BML",
            team2: "Ashoka Blue",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-16T10:40:00"
        },
        {
            team1: "Ashoka Blue",
            team2: "SNU A",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-15T19:40:00"
        },
        {
            team1: "SNU A",
            team2: "Amity Noida",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-16T18:20:00"
        },
        {
            team1: "UPES",
            team2: "Amity Noida",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-16T12:20:00"
        },
        {
            team1: "BML",
            team2: "Amity Noida",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Football Ground",
            time: "2024-11-16T17:00:00"
        }
    ],
    "Squash - Men": [
        {
            team1: "Ashoka",
            team2: "Manipal B",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Court 1",
            time: "2024-11-16T09:00:00"
        },
        {
            team1: "Manipal B",
            team2: "SNU A",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Court 2",
            time: "2024-11-16T12:00:00"
        },
        {
            team1: "SNU A",
            team2: "Ashoka",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Court 2",
            time: "2024-11-15T16:00:00"
        },
        {
            team1: "SNU B",
            team2: "Manipal A",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Court 4",
            time: "2024-11-16T13:00:00"
        },
        {
            team1: "GBU",
            team2: "SNU B",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Court 4",
            time: "2024-11-15T10:00:00"
        },
        {
            team1: "Manipal A",
            team2: "Galgotias",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Court 4",
            time: "2024-11-16T10:00:00"
        },
        {
            team1: "Galgotias",
            team2: "GBU",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Court 4",
            time: "2024-11-15T17:00:00"
        },
        {
            team1: "GBU",
            team2: "Manipal A",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Court 4",
            time: "2024-11-16T08:30:00"
        },
        {
            team1: "Galgotias",
            team2: "SNU B",
            score1: 0,
            score2: 0,
            win: 0,
            location: "Court 4",
            time: "2024-11-15T13:00:00"
        }
    ],
    "Tennis - Men": [
        {
            team1: "SNU A",
            team2: "Munjal",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-15T10:00:00",
            win: 0
        },
        {
            team1: "SNU A",
            team2: "MUJ B",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-15T19:30:00",
            win: 0
        },
        {
            team1: "Munjal",
            team2: "MUJ B",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T20:30:00",
            win: 0
        },
        {
            team1: "Bennett B",
            team2: "Venky",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-15T11:30:00",
            win: 0
        },
        {
            team1: "Khalsa",
            team2: "Ashoka A",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-15T13:00:00",
            win: 0
        },
        {
            team1: "Ashoka A",
            team2: "Bennett B",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-16T09:00:00",
            win: 0
        },
        {
            team1: "Venky",
            team2: "Khalsa",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-16T12:00:00",
            win: 0
        },
        {
            team1: "Khalsa",
            team2: "Bennett B",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-16T18:00:00",
            win: 0
        },
        {
            team1: "Ashoka A",
            team2: "Venky",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-16T19:30:00",
            win: 0
        },
        {
            team1: "Bennett A",
            team2: "Ashoka B",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-15T15:00:00",
            win: 0
        },
        {
            team1: "Ashoka B",
            team2: "Hansraj",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-15T19:30:00",
            win: 0
        },
        {
            team1: "Hansraj",
            team2: "Bennett A",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-16T16:30:00",
            win: 0
        },
        {
            team1: "SNU Alum",
            team2: "MUJ A",
            score1: 0,
            score2: 0,
            location: "Court 2",
            time: "2024-11-15T18:00:00",
            win: 0
        },
        {
            team1: "MUJ A",
            team2: "SNU B",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T19:30:00",
            win: 0
        },
        {
            team1: "SNU B",
            team2: "SNU Alum",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T18:00:00",
            win: 0
        }
    ],
    "Tennis - Women": [
        {
            team1: "Bennett",
            team2: "Ashoka B",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T15:00:00",
            win: 0
        },
        {
            team1: "SNU",
            team2: "Bennett",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T16:30:00",
            win: 0
        },
        {
            team1: "Ashoka B",
            team2: "MUJ",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-16T09:00:00",
            win: 0
        },
        {
            team1: "MUJ",
            team2: "Bennett",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-16T12:00:00",
            win: 0
        },
        {
            team1: "SNU",
            team2: "Ashoka B",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-16T16:30:00",
            win: 0
        },
        {
            team1: "SNU",
            team2: "MUJ",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-16T19:30:00",
            win: 0
        },
        {
            team1: "SRCC",
            team2: "IPCW",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T10:00:00",
            win: 0
        },
        {
            team1: "Venky",
            team2: "IPCW",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T23:30:00",
            win: 0
        },
        {
            team1: "SRCC",
            team2: "Ashoka A",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T13:00:00",
            win: 0
        },
        {
            team1: "Venky",
            team2: "Ashoka A",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-15T18:00:00",
            win: 0
        },
        {
            team1: "SRCC",
            team2: "Venky",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-16T10:30:00",
            win: 0
        },
        {
            team1: "IPCW",
            team2: "Ashoka A",
            score1: 0,
            score2: 0,
            location: "Court 1",
            time: "2024-11-16T15:00:00",
            win: 0
        }
    ],
    "Table Tennis - Men": [
        {
            "team1": "SNU",
            "team2": "Munjal",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 3",
            "time": "2024-11-15T11:00:00"
        },
        {
            "team1": "NIIT",
            "team2": "Ashoka A",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 1",
            "time": "2024-11-15T11:00:00"
        },
        {
            "team1": "Bennett",
            "team2": "KR Mangalam",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 1",
            "time": "2024-11-15T12:00:00"
        },
        {
            "team1": "Symbiosis",
            "team2": "Ashoka B",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 5",
            "time": "2024-11-15T12:00:00"
        },
        {
            "team1": "Munjal",
            "team2": "NIIT",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 1",
            "time": "2024-11-15T14:00:00"
        },
        {
            "team1": "SNU",
            "team2": "Ashoka B",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 2",
            "time": "2024-11-15T14:00:00"
        },
        {
            "team1": "Bennett",
            "team2": "Ashoka A",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 2",
            "time": "2024-11-15T15:00:00"
        },
        {
            "team1": "KR Mangalam",
            "team2": "Symbiosis",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 5",
            "time": "2024-11-15T15:00:00"
        },
        {
            "team1": "Ashoka B",
            "team2": "NIIT",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 5",
            "time": "2024-11-15T16:00:00"
        },
        {
            "team1": "SNU",
            "team2": "KR Mangalam",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 3",
            "time": "2024-11-15T16:00:00"
        },
        {
            "team1": "Sukhdev",
            "team2": "Jaypee",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 2",
            "time": "2024-11-15T11:00:00"
        },
        {
            "team1": "UPES",
            "team2": "SGGSCC",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 3",
            "time": "2024-11-15T12:00:00"
        },
        {
            "team1": "Bhagat",
            "team2": "IIITD",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 2",
            "time": "2024-11-15T12:00:00"
        },
        {
            "team1": "Sukhdev",
            "team2": "SGGSCC",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 3",
            "time": "2024-11-15T14:00:00"
        },
        {
            "team1": "Bhagat",
            "team2": "UPES",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 3",
            "time": "2024-11-15T15:00:00"
        },
        {
            "team1": "KMC",
            "team2": "IIITD",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 1",
            "time": "2024-11-15T15:00:00"
        },
        {
            "team1": "Manipal",
            "team2": "Sukhdev",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 1",
            "time": "2024-11-15T16:00:00"
        },
        {
            "team1": "Jaypee",
            "team2": "SGGSCC",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 2",
            "time": "2024-11-15T16:00:00"
        },
        {
            "team1": "Bhagat",
            "team2": "KMC",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 3",
            "time": "2024-11-15T17:00:00"
        },
        {
            "team1": "Manipal",
            "team2": "SGGSCC",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 1",
            "time": "2024-11-15T17:00:00"
        },
        {
            "team1": "Manipal",
            "team2": "Bhagat",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 3",
            "time": "2024-11-15T19:00:00"
        },
        {
            "team1": "Jaypee",
            "team2": "UPES",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 2",
            "time": "2024-11-15T19:00:00"
        },
        {
            "team1": "Sukhdev",
            "team2": "Bhagat",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 3",
            "time": "2024-11-16T09:00:00"
        },
        {
            "team1": "Manipal",
            "team2": "UPES",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 1",
            "time": "2024-11-16T09:00:00"
        },
        {
            "team1": "SGGSCC",
            "team2": "KMC",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 2",
            "time": "2024-11-16T10:00:00"
        },
        {
            "team1": "IIITD",
            "team2": "Sukhdev",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 1",
            "time": "2024-11-16T11:00:00"
        },
        {
            "team1": "KMC",
            "team2": "UPES",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 3",
            "time": "2024-11-16T11:00:00"
        },
        {
            "team1": "SGGSCC",
            "team2": "Sukhdev",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 3",
            "time": "2024-11-16T12:00:00"
        },
        {
            "team1": "Manipal",
            "team2": "Jaypee",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 1",
            "time": "2024-11-16T12:00:00"
        },
        {
            "team1": "IIITD",
            "team2": "SGGSCC",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 2",
            "time": "2024-11-16T14:00:00"
        }
    ],
    "Table Tennis - Women": [
        {
            "team1": "SNU",
            "team2": "Ashoka B",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 4",
            "time": "2024-11-15T11:00:00"
        },
        {
            "team1": "Ashoka A",
            "team2": "NIIT",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 6",
            "time": "2024-11-15T11:00:00"
        },
        {
            "team1": "Ashoka B",
            "team2": "NIIT",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 4",
            "time": "2024-11-15T12:00:00"
        },
        {
            "team1": "Jaypee",
            "team2": "Ashoka A",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 6",
            "time": "2024-11-15T12:00:00"
        },
        {
            "team1": "SRCC",
            "team2": "NIIT",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 4",
            "time": "2024-11-15T14:00:00"
        },
        {
            "team1": "Ashoka B",
            "team2": "Bennett",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 6",
            "time": "2024-11-15T14:00:00"
        },
        {
            "team1": "SNU",
            "team2": "IGDTUW",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 4",
            "time": "2024-11-15T15:00:00"
        },
        {
            "team1": "Ashoka B",
            "team2": "SRCC",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 6",
            "time": "2024-11-15T15:00:00"
        },
        {
            "team1": "Ashoka B",
            "team2": "KMC",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 4",
            "time": "2024-11-15T16:00:00"
        },
        {
            "team1": "Ashoka A",
            "team2": "NIIT",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 6",
            "time": "2024-11-15T16:00:00"
        },
        {
            "team1": "SNU",
            "team2": "Jaypee",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 4",
            "time": "2024-11-15T17:00:00"
        },
        {
            "team1": "Ashoka A",
            "team2": "Ashoka B",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 6",
            "time": "2024-11-15T17:00:00"
        },
        {
            "team1": "Ashoka B",
            "team2": "IGDTUW",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 4",
            "time": "2024-11-15T18:00:00"
        },
        {
            "team1": "SRCC",
            "team2": "Bennett",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 6",
            "time": "2024-11-15T18:00:00"
        },
        {
            "team1": "Ashoka B",
            "team2": "Jaypee",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 6",
            "time": "2024-11-16T19:00:00"
        },
        {
            "team1": "IGDTUW",
            "team2": "KMC",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 6",
            "time": "2024-11-16T19:00:00"
        },
        {
            "team1": "Jaypee",
            "team2": "KMC",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 4",
            "time": "2024-11-16T09:00:00"
        },
        {
            "team1": "Ashoka A",
            "team2": "SRCC",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 6",
            "time": "2024-11-16T09:00:00"
        },
        {
            "team1": "SNU",
            "team2": "Bennett",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 4",
            "time": "2024-11-16T10:00:00"
        },
        {
            "team1": "Bennett",
            "team2": "KMC",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 6",
            "time": "2024-11-16T10:00:00"
        },
        {
            "team1": "SNU",
            "team2": "SRCC",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 4",
            "time": "2024-11-16T11:00:00"
        },
        {
            "team1": "Jaypee",
            "team2": "IGDTUW",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 6",
            "time": "2024-11-16T11:00:00"
        },
        {
            "team1": "Ashoka A",
            "team2": "IGDTUW",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 4",
            "time": "2024-11-16T12:00:00"
        },
        {
            "team1": "SRCC",
            "team2": "KMC",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 6",
            "time": "2024-11-16T12:00:00"
        },
        {
            "team1": "Jaypee",
            "team2": "SRCC",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 4",
            "time": "2024-11-16T14:00:00"
        },
        {
            "team1": "NIIT",
            "team2": "KMC",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 6",
            "time": "2024-11-16T14:00:00"
        },
        {
            "team1": "SNU",
            "team2": "Ashoka A",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 4",
            "time": "2024-11-16T15:00:00"
        },
        {
            "team1": "IGDTUW",
            "team2": "Bennett",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Table 6",
            "time": "2024-11-16T15:00:00"
        }
    ],
    "Volleyball - Men": [
        {
            "team1": "GL Bajaj",
            "team2": "SNU A",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Mens Court",
            "time": "2024-11-16T09:00:00"
        },
        {
            "team1": "SNU A",
            "team2": "JIIT",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Mens Court",
            "time": "2024-11-15T19:00:00"
        },
        {
            "team1": "JIIT",
            "team2": "GL Bajaj",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Mens Court",
            "time": "2024-11-15T16:00:00"
        },
        {
            "team1": "Swami Vivekanand",
            "team2": "Bennett",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Womens Court",
            "time": "2024-11-16T13:00:00"
        },
        {
            "team1": "Amity",
            "team2": "UPES",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Mens Court",
            "time": "2024-11-16T13:00:00"
        },
        {
            "team1": "UPES",
            "team2": "Bennett",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Mens Court",
            "time": "2024-11-15T14:30:00"
        },
        {
            "team1": "Swami Vivekanand",
            "team2": "Amity",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Mens Court",
            "time": "2024-11-16T16:00:00"
        },
        {
            "team1": "UPES",
            "team2": "Swami Vivekanand",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Mens Court",
            "time": "2024-11-16T20:30:00"
        },
        {
            "team1": "Bennett",
            "team2": "Amity",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Mens Court",
            "time": "2024-11-16T19:00:00"
        },
        {
            "team1": "SNU C",
            "team2": "Ashoka",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Mens Court",
            "time": "2024-11-15T10:30:00"
        },
        {
            "team1": "Ashoka",
            "team2": "SNU B",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Mens Court",
            "time": "2024-11-16T14:30:00"
        },
        {
            "team1": "SNU B",
            "team2": "SNU C",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Mens Court",
            "time": "2024-11-15T20:30:00"
        },
        {
            "team1": "PGDAV",
            "team2": "Jamia",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Mens Court",
            "time": "2024-11-16T10:30:00"
        },
        {
            "team1": "Motilal",
            "team2": "IARI",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Mens Court",
            "time": "2024-11-15T17:30:00"
        },
        {
            "team1": "Jamia",
            "team2": "IARI",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Womens Court",
            "time": "2024-11-16T16:00:00"
        },
        {
            "team1": "PGDAV",
            "team2": "Motilal",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Womens Court",
            "time": "2024-11-15T20:30:00"
        },
        {
            "team1": "PGDAV",
            "team2": "IARI",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Mens Court",
            "time": "2024-11-15T13:00:00"
        },
        {
            "team1": "Jamia",
            "team2": "Motilal",
            "score1": 0,
            "score2": 0,
            "win": 0,
            "location": "Mens Court",
            "time": "2024-11-16T19:00:00"
        }
    ],
    "Volleyball - Women": [
        {
            team1: "Kanori",
            team2: "UPES",
            score1: 0,
            score2: 0,
            location: "Womens Court",
            time: "2024-11-16T14:30:00",
            win: 0
        },
        {
            team1: "UPES",
            team2: "Gargi",
            score1: 0,
            score2: 0,
            location: "Womens Court",
            time: "2024-11-16T09:00:00",
            win: 0
        },
        {
            team1: "Gargi",
            team2: "Kanori",
            score1: 0,
            score2: 0,
            location: "Womens Court",
            time: "2024-11-16T20:30:00",
            win: 0
        },
        {
            team1: "Rajasthan Uni",
            team2: "Ashoka",
            score1: 0,
            score2: 0,
            location: "Womens Court",
            time: "2024-11-15T13:00:00",
            win: 0
        },
        {
            team1: "Bennett",
            team2: "Munjal",
            score1: 0,
            score2: 0,
            location: "Womens Court",
            time: "2024-11-15T14:30:00",
            win: 0
        },
        {
            team1: "Bennett",
            team2: "SNU A",
            score1: 0,
            score2: 0,
            location: "Womens Court",
            time: "2024-11-15T19:00:00",
            win: 0
        },
        {
            team1: "SNU A",
            team2: "Munjal",
            score1: 0,
            score2: 0,
            location: "Womens Court",
            time: "2024-11-16T19:30:00",
            win: 0
        },
        {
            team1: "SNU B",
            team2: "Amity",
            score1: 0,
            score2: 0,
            location: "Womens Court",
            time: "2024-11-16T17:30:00",
            win: 0
        },
        {
            team1: "GL Bajaj",
            team2: "Amity",
            score1: 0,
            score2: 0,
            location: "Womens Court",
            time: "2024-11-15T10:30:00",
            win: 0
        },
        {
            team1: "GL Bajaj",
            team2: "SNU B",
            score1: 0,
            score2: 0,
            location: "Womens Court",
            time: "2024-11-15T16:00:00",
            win: 0
        }
    ],
    "Athletics - Men": [
        {
            name: "1500m Finals",
            time: "2024-11-15T11:20:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "400m Heats",
            time: "2024-11-15T00:10:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "Discus Throw Finals",
            time: "2024-11-15T14:30:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "800m Finals",
            time: "2024-11-16T09:00:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "Shot Put Finals",
            time: "2024-11-16T09:30:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "4x100m Finals",
            time: "2024-11-16T11:30:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "200m Heats",
            time: "2024-11-16T00:30:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "200m Finals",
            time: "2024-11-16T16:45:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "5000m Finals",
            time: "2024-11-17T08:45:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "Long Jump Finals",
            time: "2024-11-17T09:30:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "400m Finals",
            time: "2024-11-17T10:30:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "100m Heats",
            time: "2024-11-17T14:00:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "100m Finals",
            time: "2024-11-17T15:30:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "4x400m Finals",
            time: "2024-11-17T16:30:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        }
    ],
    "Athletics - Women": [
        {
            name: "800m Finals",
            time: "2024-11-15T11:00:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "200m Finals",
            time: "2024-11-15T11:45:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "Discus Throw Finals",
            time: "2024-11-15T15:30:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "4x100m Finals",
            time: "2024-11-15T16:30:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "1500m Finals",
            time: "2024-11-16T09:10:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "Long Jump Finals",
            time: "2024-11-16T10:30:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "400m Finals",
            time: "2024-11-16T16:30:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "5000m Finals",
            time: "2024-11-17T08:45:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "Shot Put Finals",
            time: "2024-11-17T12:00:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "100m Heats",
            time: "2024-11-17T14:20:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "100m Finals",
            time: "2024-11-17T15:40:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        },
        {
            name: "4x400m Finals",
            time: "2024-11-17T16:45:00",
            gold: "-",
            silver: "-",
            bronze: "-"
        }
    ],
    "Powerlifting": [
        {
            name: "Powerlifting - Men",
            gold: "-",
            silver: "-",
            bronze: "-",
            time: "2024-11-16T09:00:00"
        },
        {
            name: "Powerlifting - Women",
            gold: "-",
            silver: "-",
            bronze: "-",
            time: "2024-11-16T09:00:00"
        }
    ]
}

// finals and quarterfinals not added, add later
// chess mixed no data in excel, add later