import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
  Badge,
  Spacer,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Global } from "@emotion/react";

import { FaBasketballBall } from "react-icons/fa";
import { MdSportsCricket } from "react-icons/md";
import { PiSoccerBallDuotone } from "react-icons/pi";
import { MdOutlineSportsTennis } from "react-icons/md";

import { Layout } from "~/components/layout";

import { textBorder } from "~/components/landing/stats";

import { sportsEvents } from "~/components/landing/sports";

// const sportsEvents = [
//   { name: "Football", icon: PiSoccerBallDuotone, status: "NOT BOOKED" },
//   { name: "Cricket", icon: MdSportsCricket, status: "NOT BOOKED" },
//   { name: "Basketball", icon: FaBasketballBall, status: "NOT BOOKED" },
//   { name: "Tennis", icon: MdOutlineSportsTennis, status: "NOT BOOKED" },
// ];

function Dashboard() {
  const { data: session } = useSession();

  return (
    <Layout title="Login">
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
        gap={4}
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

      <Grid templateColumns="1fr 1fr" mx="10rem" gap={10}>
        {sportsEvents.map(({ title, description, tempImg }, i) => (
          <GridItem
            key={i}
            bgColor="#171717"
            h="15rem"
            borderRadius="10rem"
            as={Grid}
            templateColumns="1fr 1fr"
            templateRows="1fr"
            p="30px"
            cursor="pointer"
            transition="all .1s ease-in"
            _hover={{
              transform: "translateY(-1px)",
            }}
          >
            <GridItem></GridItem>
            <GridItem>
              <Text fontSize="25px" fontWeight={600}>
                {title}
              </Text>
            </GridItem>
          </GridItem>
        ))}
      </Grid>

      <Spacer h="5rem" />
    </Layout>
  );
}

export default Dashboard;
