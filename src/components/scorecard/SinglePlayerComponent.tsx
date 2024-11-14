import { SinglePlayerEvent } from "~/types/types";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";

const formatDateTime = (dateTime: string) => {
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
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSinglePlayerEvent = (event: any): event is SinglePlayerEvent => {
    return 'name' in event && 'gold' in event && 'silver' in event && 'bronze' in event && 'time' in event;
};

export const SinglePlayerComponent = ({ match, title }: { match: SinglePlayerEvent[]; title: string }) => {
    return (
        <Box w="100%" p={4} borderRadius="lg" color="white" boxShadow="md">
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
                    {match.map((event, index) => (
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
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};