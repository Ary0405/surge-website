import { useState, useEffect } from "react";
import { Layout } from "~/components/layout";
import { Global } from "@emotion/react";
import { Box, Text } from "@chakra-ui/react";
import { SinglePlayerEvent, MultiPlayerEvent } from "~/types/types";
import { MultiPlayerComponent, isMultiPlayerEvent } from "~/components/scorecard/MultiPlayerComponent";
import { SinglePlayerComponent, isSinglePlayerEvent } from "~/components/scorecard/SinglePlayerComponent";
import { api } from "~/utils/api";

function Scoreboard() {
  const [activeSportIndex, setActiveSportIndex] = useState(0);
  const { data: matchFixtures } = api.reg.getSportFixtures.useQuery();
  const sports = matchFixtures ? Object.keys(matchFixtures) : [];
  const activeSport = sports[activeSportIndex];
  const activeSportData = activeSport && matchFixtures ? matchFixtures[activeSport] : undefined;

  useEffect(() => {
    const reloadInterval = setInterval(() => {
      window.location.reload();
    }, 3600000); // Reload every hour

    return () => clearInterval(reloadInterval);
  }, []);

  useEffect(() => {
    if (!activeSportData) return;

    const intervalDuration = ((activeSportData.length / 6) + 1) * 6000; // Calculate interval duration based on number of matches
    const switchInterval = setInterval(() => {
      setActiveSportIndex((prevIndex) => (prevIndex + 1) % sports.length);
    }, intervalDuration); // Use calculated interval duration

    return () => clearInterval(switchInterval); // Clear interval on component unmount
  }, [activeSportData, sports.length]);

  const renderContent = () => {
    if (!activeSport || !activeSportData) {
      return (
        <Text fontSize="2xl" textAlign="center" color="gray.300">
          Loading...
        </Text>
      );
    }

    return (
      <Box mb={3} key={activeSport}>
        {isMultiPlayerEvent(activeSportData[0]) ? (
          <MultiPlayerComponent match={activeSportData as MultiPlayerEvent[]} title={activeSport} mode={1} />
        ) : (
          isSinglePlayerEvent(activeSportData[0]) && (
            <SinglePlayerComponent match={activeSportData as SinglePlayerEvent[]} title={activeSport} mode={1} />
          )
        )}
      </Box>
    );
  };

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
        bg="linear-gradient(180deg, rgba(29,4,83,1) 0%, rgba(16,2,33,1) 100%)"
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
        h="760px" // Fixed height for the box
        overflowY="hidden"
      >
        {renderContent()}
      </Box>
    </Layout>
  );
}

export default Scoreboard;