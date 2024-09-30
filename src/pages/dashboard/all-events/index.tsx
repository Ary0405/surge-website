import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Spacer,
  Button,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { useRouter } from "next/router";
import { Layout } from "~/components/layout";
import { textBorder } from "~/components/landing/stats";
import { api } from "~/utils/api";
import { FaArrowRight } from "react-icons/fa";

function EventsPage() {

  const router = useRouter();

  // Fetch sports events using tRPC
  const {
    data: sportsEvents,
    isLoading,
    isError,
  } = api.reg.getAvailableSports.useQuery();

  if (isLoading) {
    return (
      <Layout title="Events">
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

  if (isError) {
    return (
      <Layout title="Events">
        <Text>Error loading events.</Text>
      </Layout>
    );
  }

  // Function to map the event name to its corresponding image file
  // const getSportImage = (slug: string) => {
  //   return `/images/landing/sports/${slug.replace("-", "_")}.png`;
  // };

  return (
    <Layout title="Events">
      <Global
        styles={{
          body: {
            overflowX: "hidden",
          },
        }}
      />
      <Flex
        textTransform="uppercase"
        fontFamily="Migra"
        fontSize="100px"
        fontWeight={800}
        fontStyle="italic"
        color="#F4AC17"
        gap={4}
        left="50%"
        right="50%"
        ml="-50vw"
        mr="-50vw"
      >
        {[...Array<number>(8)].map((_, index) => (
          <Box key={index} display="flex" flexDir="row" gap={4}>
            <Text>Events</Text>
            <Text color="#121212" {...textBorder("#F4AC17")}>
              Events
            </Text>
          </Box>
        ))}
      </Flex>
      <Flex
        textTransform="uppercase"
        fontFamily="Migra"
        fontSize="100px"
        fontWeight={800}
        fontStyle="italic"
        color="#F4AC17"
        lineHeight="30px"
        gap={4}
        left="50%"
        right="50%"
        ml="-50vw"
        mr="-50vw"
        transform="translateX(400px)"
      >
        {[...Array<number>(8)].map((_, index) => (
          <Box key={index} display="flex" flexDir="row" gap={4}>
            <Text>Events</Text>
            <Text color="#121212" {...textBorder("#F4AC17")}>
              Events
            </Text>
          </Box>
        ))}
      </Flex>
      <Flex
        textTransform="uppercase"
        fontFamily="Migra"
        fontSize="100px"
        fontWeight={800}
        fontStyle="italic"
        color="#F4AC17"
        lineHeight="150px"
        gap={2}
        left="50%"
        right="50%"
        ml="-50vw"
        mr="-50vw"
        transform="translateX(-100px)"
      >
        {[...Array<number>(8)].map((_, index) => (
          <Box key={index} display="flex" flexDir="row" gap={4}>
            <Text>Events</Text>
            <Text color="#121212" {...textBorder("#F4AC17")}>
              Events
            </Text>
          </Box>
        ))}
      </Flex>

      <Grid templateColumns="1fr 1fr" mx="3rem" gap={10}>
        {sportsEvents?.map(
          (
            { name, eventImg, slug, dateFrom, dateTo, pricePerPlayer, rules, about },
            i
          ) => (
            <GridItem
              key={i}
              bgColor="#171717"
              borderRadius="10rem"
              as={Grid}
              templateColumns="2fr 3fr"
              templateRows="1fr"
              gap={8}
              p="30px"
              cursor="pointer"
              transition="all .1s ease-in"
              onClick={() => router.push(`/dashboard/all-events/${slug}`)}
              _hover={{
                transform: "translateY(-1px)",
              }}
            >
              <GridItem
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src={eventImg ?? ""}
                  alt={name}
                  borderRadius="full"
                  boxSize="200px"
                />
              </GridItem>
              <GridItem>
                <Text fontSize="25px" fontWeight={600} color="white">
                  {name}
                </Text>
                <Text fontSize="14px" fontWeight={400} color="gray.400">
                  {about}
                </Text>
                <Text fontSize="20px" fontWeight={500} color="#F4AC17" mt={4}>
                  ₹{pricePerPlayer} / {name === 'Valorant' ? "Team" : "Person"}
                </Text>
                <Text fontSize="15px" fontWeight={400} color="gray.400" mt={2}>
                  {new Date(dateFrom).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(dateTo).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
                <Button
                  size="md"
                  color="#F4AC17"
                  mt={4}
                  rightIcon={<FaArrowRight />}
                  variant="link"
                >
                  Register
                </Button>
              </GridItem>
            </GridItem>
          )
        )}
      </Grid>

      <Spacer h="5rem" />
    </Layout>
  );
}

export default EventsPage;
