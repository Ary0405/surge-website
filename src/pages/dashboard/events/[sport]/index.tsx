import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Divider,
  Stack,
  Icon,
  SimpleGrid,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Layout } from "~/components/layout";
import { api } from "~/utils/api";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaTrophy,
} from "react-icons/fa";

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
        <Flex justifyContent="center" alignItems="center" height="30vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#F4AC18"
            size="xl"
          />
        </Flex>
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

  const handleRegisterClick = () => {
    router.push(`${router.asPath}/register`);
  };

  return (
    <Layout>
      <Box
        maxW="6xl"
        mx="auto"
        py={8}
        px={6}
        bg="gray.900"
        borderRadius="30px"
        border="1px solid #F4AC18"
        boxShadow="lg"
        mt={8}
      >
        <Flex justifyContent="space-between" alignItems="flex-start" mb={8}>
          <Box>
            <Heading as="h1" size="2xl" color="#F4AC18" mb={4}>
              {data.name}
            </Heading>
            <Text fontSize="lg" mb={6} color="gray.300">
              {data.rules}
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={8}>
              <Flex align="center">
                <Icon as={FaMapMarkerAlt} w={6} h={6} color="#F4AC18" mr={4} />
                <Text fontSize="xl" color="gray.100">
                  Location: {data.venue}
                </Text>
              </Flex>
              <Flex align="center">
                <Icon as={FaUsers} w={6} h={6} color="#F4AC18" mr={4} />
                <Text fontSize="xl" color="gray.100">
                  Category: {data.category}
                </Text>
              </Flex>
              <Flex align="center">
                <Icon as={FaCalendarAlt} w={6} h={6} color="#F4AC18" mr={4} />
                <Text fontSize="xl" color="gray.100">
                  Date: {new Date(data.dateFrom).toLocaleDateString()} -{" "}
                  {new Date(data.dateTo).toLocaleDateString()}
                </Text>
              </Flex>
              <Flex align="center">
                <Icon as={FaUsers} w={6} h={6} color="#F4AC18" mr={4} />
                <Text fontSize="xl" color="gray.100">
                  Team Size: {data.minPlayers} - {data.maxPlayers}
                </Text>
              </Flex>
            </SimpleGrid>
          </Box>
          <Box textAlign="right">
            <Flex alignItems="center" gap={4} mb={2} mx="auto">
              <Text fontSize="2xl" color="#F4AC18">
                ₹{data.pricePerPlayer}
              </Text>
              <Text fontSize="sm" color="gray.100">
                per player
              </Text>
            </Flex>
            <Button
              size="lg"
              colorScheme="yellow"
              boxShadow="lg"
              _hover={{
                boxShadow: "xl",
                transform: "translateY(-2px)",
              }}
              transition="all 0.3s ease"
              color="#fff"
              bgColor="#F4AC17"
              onClick={handleRegisterClick}
            >
              Register Now
            </Button>
          </Box>
        </Flex>

        <Divider borderColor="gray.700" mb={8} />

        <Box>
          <Heading as="h2" size="lg" mb={4} color="#F4AC18">
            Prizes
          </Heading>
          <Flex direction="column" gap={4} color="gray.100">
            <Text fontSize="xl">
              <Icon as={FaTrophy} w={6} h={6} color="#F4AC18" mr={4} />
              Winner Prize: ₹{data.winnerPrize}
            </Text>
            {data.winningTeamPrize > 0 && (
              <Text fontSize="xl">
                <Icon as={FaTrophy} w={6} h={6} color="#F4AC18" mr={4} />
                Winning Team Prize: ₹{data.winningTeamPrize}
              </Text>
            )}
            <Text fontSize="xl">
              <Icon as={FaTrophy} w={6} h={6} color="#F4AC18" mr={4} />
              Runner-Up Prize: ₹{data.runnerUpPrize}
            </Text>
            {data.runnerUpTeamPrize > 0 && (
              <Text fontSize="xl">
                <Icon as={FaTrophy} w={6} h={6} color="#F4AC18" mr={4} />
                Runner-Up Team Prize: ₹{data.runnerUpTeamPrize}
              </Text>
            )}
          </Flex>
        </Box>
      </Box>

      <Spacer h="10rem" />
    </Layout>
  );
};

export default EventPage;
