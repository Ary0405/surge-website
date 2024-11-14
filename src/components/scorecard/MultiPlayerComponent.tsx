import { Box, Flex, Text } from "@chakra-ui/react";
import { MultiPlayerEvent } from "~/types/types";
import { Table, Thead, Tbody, Tr, Th, Td, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@chakra-ui/react";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isMultiPlayerEvent = (event: any): event is MultiPlayerEvent => {
    return 'team1' in event && 'team2' in event;
};

const formatDateTime = (dateTime: string) => {
    try {

        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
        });
        const formattedTime = date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        });
        return `${formattedDate}, ${formattedTime}`;
    } catch (e) {
        return dateTime;
    }
};
const Match = ({ team1, team2, score1, score2, win }: { team1: string, team2: string, score1: number, score2: number, win: number }) => {

    return (
        <Flex
            w="100%"
            p={2}
            borderRadius="md"
            justifyContent="space-between"
            align="center"
        >
            <Flex
                align="center"
                justify="flex-start"
                bg={(win === 1) ? "linear-gradient(180deg, rgba(245,175,20,1) 0%, rgba(233,90,9,1) 100%)" : "linear-gradient(270deg, rgba(75,0,90,1) 0%, rgba(15,6,75,1) 100%)"}
                color="white"
                transform="skew(-20deg)"
                px={4}
                py={2}
                borderRadius="0%"
                boxShadow="md"
                flex="1"
            >
                <Text fontWeight="bold" fontSize="lg" textAlign="left" transform="skew(20deg)">
                    {team1}
                </Text>
            </Flex>
            <Flex align="center" justify="center" flex="0.4">
                <Box
                    fontSize="xl"
                    fontWeight="bold"
                    p={2}
                    pr={3}
                    pl={3}
                    borderRadius="0%"
                    transform="skew(-20deg)"
                    mx={1}
                    boxShadow="md"
                    minW="40px"
                    textAlign="center"
                    ml={-3}
                    color="black"
                    bg={(win === 2) ? "linear-gradient(90deg, rgba(241,148,16,1) 0%, rgba(255,115,43,1) 100%)" : ((win === 1) ? "#FFF" : "yellow.400")}
                    filter="drop-shadow(-5px 6px 4px #000000)"
                >
                    <Text transform="skew(20deg)">{score1}</Text>
                </Box>
                <Text fontSize="xl" fontWeight="bold" mx={1}>
                    Vs
                </Text>
                <Box
                    fontSize="xl"
                    fontWeight="bold"
                    p={2}
                    pr={3}
                    pl={3}
                    alignItems="center"
                    borderRadius="0%"
                    transform="skew(20deg)"
                    mx={1}
                    boxShadow="md"
                    minW="40px"
                    textAlign="center"
                    zIndex="1"
                    color="black"
                    bg={(win === 1) ? "linear-gradient(90deg, rgba(241,148,16,1) 0%, rgba(255,115,43,1) 100%)" : ((win === 2) ? "#FFF" : "yellow.400")}
                    filter="drop-shadow(6px 6px 4px #000000)"
                >
                    <Text transform="skew(-20deg)">{score2}</Text>
                </Box>
            </Flex>
            <Flex
                align="center"
                justify="flex-end"
                bg={(win === 2) ? "linear-gradient(180deg, rgba(245,175,20,1) 0%, rgba(233,90,9,1) 100%)" : "linear-gradient(270deg, rgba(75,0,90,1) 0%, rgba(15,6,75,1) 100%)"}
                color="white"
                transform="skew(20deg)"
                px={4}
                py={2}
                borderRadius="0%"
                boxShadow="md"
                flex="1"
                ml={-3}
                zIndex="0"
            >
                <Text fontWeight="bold" fontSize="lg" textAlign="right" transform="skew(-20deg)">
                    {team2}
                </Text>
            </Flex>
        </Flex>
    )

}
export const MultiPlayerComponent = ({ match, title, mode }: { match: MultiPlayerEvent[]; title: string, mode: number }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 6) % match.length);
        }, 6000); // Switch every 6 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [match.length]);

    const sortedMatches = [...match].sort((a, b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        if (isNaN(dateA.getTime())) return 1; // Treat invalid dates as very new dates
        if (isNaN(dateB.getTime())) return -1; // Treat invalid dates as very new dates
        return dateA.getTime() - dateB.getTime();
    });

    const displayedMatches = mode === 1 ? sortedMatches.slice(currentIndex, currentIndex + 6) : sortedMatches;

    return (
        <Box>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Image src="/images/surge-color.png" alt="SURGE" width={isMobile ? 90 : "15rem"} height="auto" style={{ margin: "0.5rem", objectFit: "fill" }} />
            </div>
            <Text fontSize="4xl" fontWeight="bold" mb={4} textAlign="center" color="yellow.400">
                {title}
            </Text>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Match</Th>
                        <Th>Location</Th>
                        <Th>Time</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {displayedMatches.map((match, index) => (
                        <Tr key={index}>
                            <Td>
                                <Text fontWeight="bold" fontSize="lg">
                                    <Match team1={match.team1} team2={match.team2} score1={match.score1} score2={match.score2} win={match.win} />
                                </Text>
                            </Td>
                            <Td>{match.location}</Td>
                            <Td>{formatDateTime(match.time)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};