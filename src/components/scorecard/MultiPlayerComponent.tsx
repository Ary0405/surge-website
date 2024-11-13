
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { MultiPlayerEvent } from "~/types/types";

export const isMultiPlayerEvent = (event: any): event is MultiPlayerEvent => {
    return 'team1' in event && 'team2' in event;
};

export const MultiPlayerComponent = ({ match }: { match: MultiPlayerEvent[] }) => {
    return (
        <Box mb={3} >
            <VStack spacing={2}>
                {match.slice(-6).map((match, index) => (
                    <Flex
                        key={index}
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
                                {match.team1}
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
                                bg={(match.win === 1) ? "#97eb0f" : ((match.win === 2) ? "#d93300" : "yellow.400")}
                            >
                                <Text transform="skew(20deg)">{match.score1}</Text>
                            </Box>
                            <Text fontSize="xl" fontWeight="bold" mx={1}>
                                :
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
                                bg={(match.win === 2) ? "#97eb0f" : ((match.win === 1) ? "#d93300" : "yellow.400")}
                            >
                                <Text transform="skew(-20deg)">{match.score2}</Text>
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
                                {match.team2}
                            </Text>
                        </Flex>
                    </Flex>
                ))}
            </VStack>
        </Box>
    );
}