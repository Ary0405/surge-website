import { SinglePlayerEvent } from "~/types/types";
import { Table, Thead, Tbody, Tr, Th, Td, Image } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@chakra-ui/react";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSinglePlayerEvent = (event: any): event is SinglePlayerEvent => {
    return 'name' in event && 'gold' in event && 'silver' in event && 'bronze' in event && 'time' in event;
};

export const SinglePlayerComponent = ({ match, title, mode }: { match: SinglePlayerEvent[]; title: string, mode: number }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

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

    const displayedMatches = mode === 1 ? sortedMatches.slice(currentIndex, currentIndex + 7) : sortedMatches;
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    return (
        <Box w="100%" p={4} borderRadius="lg" color="white" boxShadow="md">
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Image src="/images/surge-color.png" alt="SURGE" width={isMobile ? 90 : "15rem"} height="auto" style={{ margin: "0.5rem", objectFit: "fill" }} />
            </div>
            <Text fontSize="4xl" fontWeight="bold" mb={4} textAlign="center" color="yellow.400">
                {title}
            </Text>
            <Table variant="simple" colorScheme="yellow">
                <Thead>
                    <Tr>
                        <Th color="white">Name</Th>
                        <Th color="white">Gold</Th>
                        <Th color="white">Silver</Th>
                        <Th color="white">Bronze</Th>
                        <Th color="white">Time</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {displayedMatches.map((event, index) => (
                        <Tr key={index}>
                            <Td>{event.name}</Td>
                            <Td>
                                <Box
                                    fontSize="xl"
                                    fontWeight="bold"
                                    p={2}
                                    borderRadius="md"
                                    textAlign="center"
                                    color="black"
                                    bg="#FFD700" // Gold color
                                    minW="60px"
                                >
                                    {event.gold}
                                </Box>
                            </Td>
                            <Td>
                                <Box
                                    fontSize="xl"
                                    fontWeight="bold"
                                    p={2}
                                    borderRadius="md"
                                    textAlign="center"
                                    color="black"
                                    bg="#C0C0C0" // Silver color
                                    minW="60px"
                                >
                                    {event.silver}
                                </Box>
                            </Td>
                            <Td>
                                <Box
                                    fontSize="xl"
                                    fontWeight="bold"
                                    p={2}
                                    borderRadius="md"
                                    textAlign="center"
                                    color="black"
                                    bg="#CD7F32" // Bronze color
                                    minW="60px"
                                >
                                    {event.bronze}
                                </Box>
                            </Td>
                            <Td>{formatDateTime(event.time)}</Td>
                        </Tr>
                    ))
                    }
                </Tbody>
            </Table>
        </Box>
    );
};