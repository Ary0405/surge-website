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
      window.location.reload();
    }, 3600000);
    return () => clearInterval(interval);
  }, []);

  const activeSport = sports[activeSportIndex];
  const activeSportData = activeSport ? matchFixtures[activeSport] : undefined;

  useEffect(() => {
    if (!activeSportData) return;

    const intervalDuration = (activeSportData.length / 6) * 6000; // Calculate interval duration based on number of matches
    const interval = setInterval(() => {
      setActiveSportIndex((prevIndex) => (prevIndex + 1) % sports.length);
    }, intervalDuration); // Use calculated interval duration

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [activeSportData, sports.length]);


  return (
    <Layout title="Score Board">
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
        maxW="95%"
        mx="auto"
        my={50}
        boxShadow="2xl"
        backgroundSize="cover"
        fontFamily="poppins"
        h="750px"  // Fixed height for the box
        overflowY="auto"  // Allow vertical scrolling within the box
      >{activeSport && activeSportData ? (
        <Box mb={3} key={activeSport}>
          {
            isMultiPlayerEvent(activeSportData[0]) ? (
              <MultiPlayerComponent match={activeSportData as MultiPlayerEvent[]} title={activeSport} mode={1} />
            ) : (
              isSinglePlayerEvent(activeSportData[0]) &&
              <SinglePlayerComponent match={activeSportData as SinglePlayerEvent[]} title={activeSport} mode={1} />
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