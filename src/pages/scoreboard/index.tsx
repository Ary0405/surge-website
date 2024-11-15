import { useState, useEffect } from "react";
import { Layout } from "~/components/layout";
import { Global } from "@emotion/react";
import { Box, Select } from "@chakra-ui/react";
import { SinglePlayerEvent, MultiPlayerEvent } from "~/types/types";
import { MultiPlayerComponent, isMultiPlayerEvent } from "~/components/scorecard/MultiPlayerComponent";
import { SinglePlayerComponent, isSinglePlayerEvent } from "~/components/scorecard/SinglePlayerComponent";
import { api } from "~/utils/api";

function Scoreboard() {
  const { data: matchFixtures } = api.reg.getSportFixtures.useQuery();
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  useEffect(() => {
    if (matchFixtures && !selectedSport) {
      setSelectedSport(Object.keys(matchFixtures)[0] ?? null);
    }
  }, [matchFixtures, selectedSport]);

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(event.target.value);
  };

  const selectedSportData = selectedSport && matchFixtures ? matchFixtures[selectedSport] : null;

  return (
    <Layout title="Fixture Board">
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
      >
        <Select
          mb={4}
          value={selectedSport ?? ""}
          onChange={handleSportChange}
          fontWeight="bold"
          textAlign="center"
        >
          {matchFixtures && Object.keys(matchFixtures).map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </Select>
        {selectedSport && selectedSportData && (
          <Box mb={3} key={selectedSport}>
            {isMultiPlayerEvent(selectedSportData[0]) ? (
              <MultiPlayerComponent match={selectedSportData as MultiPlayerEvent[]} title={selectedSport} mode={0} />
            ) : (
              isSinglePlayerEvent(selectedSportData[0]) &&
              <SinglePlayerComponent match={selectedSportData as SinglePlayerEvent[]} title={selectedSport} mode={0} />
            )}
          </Box>
        )}
      </Box>
    </Layout>
  );
}

export default Scoreboard;