import { useState, useEffect } from "react";
import { Layout } from "~/components/layout";
import { Global } from "@emotion/react";
import { Box, Text } from "@chakra-ui/react";
import { matchFixtures, SinglePlayerEvent, MultiPlayerEvent } from "~/types/types";
import { MultiPlayerComponent, isMultiPlayerEvent } from "~/components/scorecard/MultiPlayerComponent";
import { SinglePlayerComponent, isSinglePlayerEvent } from "~/components/scorecard/SinglePlayerComponent";


function Scoreboard() {
  const [activeSportIndex, setActiveSportIndex] = useState(0);
  const sports = Object.keys(matchFixtures);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSportIndex((prevIndex) => (prevIndex + 1) % sports.length);
    }, 5000); // Switch every 5 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [sports.length]);

  const activeSport = sports[activeSportIndex];
  const activeSportData = activeSport ? matchFixtures[activeSport] : undefined;
  
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
        maxW="80%"
        mx="auto"
        my={50}
        boxShadow="2xl"
        backgroundSize="cover"
        fontFamily="poppins"
        h="750px"  // Fixed height for the box
        overflowY="auto"  // Allow vertical scrolling within the box
      >{activeSport && activeSportData ? (
        <Box mb={3} key={activeSport}>
          <Text fontSize="4xl" fontWeight="bold" mb={3} textAlign="center" color={"#F3AB17"}>
            {activeSport}
          </Text>
          {
            isMultiPlayerEvent(activeSportData[0]) ? (
              <MultiPlayerComponent match={activeSportData as MultiPlayerEvent[]} />
            ) : (
              isSinglePlayerEvent(activeSportData[0]) &&
              <SinglePlayerComponent match={activeSportData as SinglePlayerEvent[]} category={activeSport} />
            )
          }
        </Box>
      ) : (
        <Text fontSize="2xl" textAlign="center" color="gray.300">
          Loading...
        </Text>
      )}
      </Box>
    </Layout>
  );
}

export default Scoreboard;