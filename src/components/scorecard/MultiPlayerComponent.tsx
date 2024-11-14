import { Box, Flex, Text } from "@chakra-ui/react";
import { MultiPlayerEvent } from "~/types/types";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isMultiPlayerEvent = (event: any): event is MultiPlayerEvent => {
    return 'team1' in event && 'team2' in event;
};

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
                bg="orange.500"
                color="white"
                transform="skew(-20deg)"
                px={4}
                py={2}
                borderRadius="md"
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
                    borderRadius="md"
                    transform="skew(-20deg)"
                    mx={1}
                    boxShadow="md"
                    minW="40px"
                    textAlign="center"
                    ml={-3}
                    color="black"
                    bg={(win === 1) ? "#97eb0f" : ((win === 2) ? "#d93300" : "yellow.400")}
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
                    borderRadius="md"
                    transform="skew(20deg)"
                    mx={1}
                    boxShadow="md"
                    minW="40px"
                    textAlign="center"
                    zIndex="1"
                    color="black"
                    bg={(win === 2) ? "#97eb0f" : ((win === 1) ? "#d93300" : "yellow.400")}
                >
                    <Text transform="skew(-20deg)">{score2}</Text>
                </Box>
            </Flex>
            <Flex
                align="center"
                justify="flex-end"
                bg="orange.500"
                color="white"
                transform="skew(20deg)"
                px={4}
                py={2}
                borderRadius="md"
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

export const MultiPlayerComponent = ({ match, title }: { match: MultiPlayerEvent[]; title: string }) => {
    return (
        <Box>
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
                    {match.map((match, index) => (
                        <Tr key={index}>
                            <Td>
                                <Match {...match} />
                            </Td>
                            <Td>{match.location}</Td>
                            <Td>{formatDateTime(match.time)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}