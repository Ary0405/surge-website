import { useState, useEffect } from "react";
import { Layout } from "~/components/layout";
import { Global } from "@emotion/react";
import { Box, Text, Flex, VStack } from "@chakra-ui/react";
import matchData from "../../../../public/matches.json";

function Scoreboard() {
  const [activeSportIndex, setActiveSportIndex] = useState(0);
  const sports = Object.keys(matchData);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSportIndex((prevIndex) => (prevIndex + 1) % sports.length);
    }, 5000); // Switch every 5 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [sports.length]);

  const activeSport = sports[activeSportIndex];

  return (
    <Layout title="Dashboard">
      <Global
        styles={{
          body: {
            overflowX: "hidden",
          },
        }}
      />
      <Box
        bg="linear-gradient(135deg, #1f1f1f, #333333)"
        color="white"
        p={6}
        borderRadius="lg"
        w="100%"
        maxW="700px"
        mx="auto"
        my={50}
        boxShadow="2xl"
        backgroundSize="cover"
        fontFamily="poppins"
      >
        <Box mb={3} key={activeSport}>
          <Text fontSize="4xl" fontWeight="bold" mb={3} textAlign="center" color={"#F3AB17"}>
            {activeSport}
          </Text>
          {Object.entries(matchData[activeSport]).map(([category, matches]) => (
            <Box mb={3} key={category}>
              <Text fontSize="3xl" fontWeight="bold" mb={3} textAlign="center">
                {category}
              </Text>
              <VStack spacing={2}>
                {matches.map((match, index) => (
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
                        bg={(match.win == 1) ? "#97eb0f" : ((match.win == 2) ? "#d93300" : "yellow.400")}
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
                        bg={(match.win == 2) ? "#97eb0f" : ((match.win == 1) ? "#d93300" : "yellow.400")}
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
          ))}
        </Box>
      </Box>
    </Layout>
  );
}

export default Scoreboard;