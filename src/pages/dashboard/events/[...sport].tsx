import { Box, Heading, Text, Flex, Button, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Layout } from "~/components/layout";

import { api } from "~/utils/api";

const EventPage = () => {
  const router = useRouter();
  const { sport } = router.query;
  const eventName = Array.isArray(sport) ? sport[0] : sport || "";

  // Fetch event details using tRPC
  const { data, isLoading, isError } = api.reg.getEventDetails.useQuery({
    sportSlug: eventName ?? "",
  });

  if (isLoading) {
    return (
      <Layout>
        <Text>Loading...</Text>
      </Layout>
    );
  }

  if (isError || !data) {
    return (
      <Layout>
        <Text>Event not found</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box maxW="6xl" mx="auto" py={8}>
        <Heading as="h1" size="2xl" mb={4}>
          {data.name}
        </Heading>
        <Text mb={6}>{data.rules}</Text>

        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Box>
            <Text fontSize="xl">Location: {data.venue}</Text>
            <Text fontSize="xl">Category: {data.category}</Text>
            <Text fontSize="xl">
              Date: {new Date(data.dateFrom).toLocaleDateString()} -{" "}
              {new Date(data.dateTo).toLocaleDateString()}
            </Text>
            <Text fontSize="xl">Registration Cost: ₹{data.pricePerPlayer}</Text>
            <Text fontSize="xl">
              Team Size: {data.minPlayers} - {data.maxPlayers}
            </Text>
          </Box>
          <Box>
            <Button
              size="lg"
              colorScheme="yellow"
              onClick={() => alert("Booking feature coming soon!")}
            >
              Register
            </Button>
          </Box>
        </Flex>

        <Divider />

        <Box mt={8}>
          <Heading as="h2" size="lg" mb={4}>
            Prizes
          </Heading>
          <Text>Winner Prize: ₹{data.winnerPrize}</Text>
          {data.winningTeamPrize > 0 && (
            <Text>Winning Team Prize: ₹{data.winningTeamPrize}</Text>
          )}
          <Text>Runner-Up Prize: ₹{data.runnerUpPrize}</Text>
          {data.runnerUpTeamPrize > 0 && (
            <Text>Runner-Up Team Prize: ₹{data.runnerUpTeamPrize}</Text>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default EventPage;
