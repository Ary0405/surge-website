import {
  Box,
  Text,
  Flex,
  Button,
  Icon,
  SimpleGrid,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Layout } from "~/components/layout";
import { api } from "~/utils/api";
import { FiShoppingCart } from "react-icons/fi";
import { useSession } from "next-auth/react";

const EventPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { event } = router.query;
  const eventName = Array.isArray(event) ? event[0] : event ?? "";

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
    void router.push(`${router.asPath}/register`);
  };

  return (
    <Layout>
      {/* <Spacer h="2rem" /> */}
      {/* <Box
        maxW="6xl"
        mx="auto"
        py={8}
        px={6}
        bg="#181818"
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
                {data.name === "Valorant" ? "per team" : "per player"}
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
            <Text fontSize="xl">
              <Icon as={FaTrophy} w={6} h={6} color="#F4AC18" mr={4} />
              Runner-Up Prize: ₹{data.runnerUpPrize}
            </Text>
          </Flex>
        </Box>
      </Box> */}

      <SimpleGrid
        templateColumns={{ base: "1fr", md: "67% 33%" }}
        maxW="6xl"
        mx="auto"
        borderRadius="30px"
        border="1px solid #F4AC15"
        boxShadow="lg"
        mt={8}
        w="90%"
      >
        <Box>
          <Flex
            justifyContent="space-between"
            alignItems="flex-start"
            mb={8}
            py={8}
            px={8}
          >
            <Box>
              <Text
                as="h1"
                fontSize="4xl"
                color="#F4AC18"
                mb={7}
                fontWeight="bold"
              >
                {data.name}
              </Text>
              <Text
                as="h1"
                fontSize="2xl"
                color="#F4AC18"
                mb={4}
                fontStyle="italic"
                fontWeight="bold"
              >
                Rules and Guidelines
              </Text>
              <Text fontSize="xl" mb={6} color="gray.300">
                {data.rules}
              </Text>
            </Box>
          </Flex>
        </Box>

        <Box
          borderLeft={{ base: "0px", md: "1px solid #F4AC18" }}
          borderTop={{ base: "1px solid #F4AC18", md: "0px" }}
          py={6}
          px={6}
          bg="#181818"
          borderTopRightRadius={{ base: "0px", md: "30px" }}
          borderBottomRightRadius="30px"
          borderBottomLeftRadius={{ base: "30px", md: "0px" }}
        >
          <Flex direction="column" gap={4} color="gray.100" mt={2}>
            <Flex direction="row" mb={1}>
              <Box
                w="0"
                border="6px solid #C52C10"
                h="auto"
                borderRadius="50px"
              ></Box>
              <Flex direction="column" ml={6}>
                <Text
                  as="h1"
                  fontSize="xl"
                  mb={4}
                  fontWeight="bold"
                  color="gray.100"
                >
                  DATE
                </Text>
                <Text fontSize="l" color="gray.100" mb={6}>
                  {new Date(data.dateFrom).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  {" - "}
                  {new Date(data.dateFrom).getMonth() ===
                  new Date(data.dateTo).getMonth()
                    ? new Date(data.dateTo).toLocaleDateString("en-US", {
                        day: "numeric",
                      })
                    : new Date(data.dateTo).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                  {", "}
                  {new Date(data.dateTo).getFullYear()}
                </Text>
                <Text as="h1" fontSize="xl" mb={4} fontWeight="bold">
                  Location
                </Text>
                <Text fontSize="l" color="gray.100" mb={4}>
                  {data.name === "Valorant"
                    ? "Online"
                    : "Indoor Sports Complex"}
                </Text>
              </Flex>
            </Flex>
            <Box
              w="95%"
              h="0"
              borderBottom="1px solid"
              borderColor="gray.100"
              alignSelf="center"
            ></Box>

            <Box w="100%">
              <Flex direction="row" mb={0} mt={3} w="100%">
                <Flex direction="column" pl="36px" w="100%">
                  <Flex direction="row" w="100%">
                    <Flex direction="column" w="50%">
                      <Text
                        as="h1"
                        fontSize="lg"
                        fontWeight="bold"
                        color="gray.100"
                      >
                        Price
                      </Text>
                      <Text
                        fontSize="xl"
                        color="gray.100"
                        mb={4}
                        fontWeight="extrabold"
                      >
                        ₹{data.pricePerPlayer}
                      </Text>
                    </Flex>
                    {session && (
                      <Flex direction="column" w="50%">
                        <Button
                          onClick={() => router.push("/dashboard/cart")}
                          leftIcon={<Icon as={FiShoppingCart} />}
                          colorScheme="yellow"
                        >
                          Cart
                        </Button>
                      </Flex>
                    )}
                  </Flex>

                  <Text fontSize="l" color="gray.100">
                    Team Size: <b>{data.minPlayers}</b> -{" "}
                    <b>{data.maxPlayers}</b>
                  </Text>
                  <Text fontSize="l" color="gray.100">
                    Category: <b>{data.category}</b>
                  </Text>
                  <Button
                    size="lg"
                    boxShadow="lg"
                    mt={5}
                    mb={4}
                    _hover={{
                      boxShadow: "xl",
                      transform: "translateY(-2px)",
                    }}
                    transition="all 0.3s ease"
                    color="#181818"
                    bgColor="#F4AC17"
                    onClick={handleRegisterClick}
                    borderRadius="full"
                    width="90%"
                  >
                    Register Now
                  </Button>
                </Flex>
              </Flex>
              {/* <Flex direction="column" alignItems="center" justifyContent="center" >

                <Flex direction="row">
                  
                    <Flex direction="column" alignItems="flex-start" justifyContent="flex-start" w="100%">
                      <Text fontSize="md" color="gray.100" mb={1} fontWeight="bold">
                        Price
                      </Text>
                    </Flex>

                    <Flex></Flex>
                  
                </Flex>
                <Box>
                  lorem ipsum
                </Box>
              </Flex> */}
            </Box>
          </Flex>
        </Box>
      </SimpleGrid>
      <Spacer h="7rem" />
    </Layout>
  );
};

export default EventPage;
