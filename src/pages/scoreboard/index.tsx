import { useState } from "react";
import { Layout } from "~/components/layout";
import { Global } from "@emotion/react";
import { Box, Select } from "@chakra-ui/react";
import { matchFixtures, SinglePlayerEvent, MultiPlayerEvent } from "~/types/types";
import { MultiPlayerComponent, isMultiPlayerEvent } from "~/components/scorecard/MultiPlayerComponent";
import { SinglePlayerComponent, isSinglePlayerEvent } from "~/components/scorecard/SinglePlayerComponent";


function Scoreboard() {
  const [selectedSport, setSelectedSport] = useState<string | null>(Object.keys(matchFixtures)[0] ?? null);

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(event.target.value);
  };

  const selectedSportData = selectedSport ? matchFixtures[selectedSport] : null;

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
          {Object.keys(matchFixtures).map((sport) => (
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