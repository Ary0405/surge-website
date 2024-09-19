import {
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  useMediaQuery,
} from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import MobileStackedSportEvent from "./mobile-stacked-sport-event";

import { textBorder } from "../stats";

const MotionGridItem = motion(GridItem);
const MotionFlex = motion(Flex);

export const sportsEvents = [
  {
    title: "Football",
    description:
      "Where every pass counts and every goal ignites the crowd—football is more than a game; it's a battle of strategy and stamina on the ultimate field of dreams.",
    tempImg: "/images/landing/sports/football.png",
  },
  {
    title: "Badminton",
    description:
      "In a game where agility meets precision, badminton is a lightning-fast duel where every shuttlecock can change the course of victory.",
    tempImg: "/images/landing/sports/badminton.png",
  },
  {
    title: "Athletics",
    description:
      "The pursuit of excellence begins on the track—athletics is the purest form of human speed, strength, and endurance, pushing the limits of what’s possible.",
    tempImg: "/images/landing/sports/athletics.png",
  },
  {
    title: "Basketball",
    description:
      "Where the court is a canvas and each player paints with speed, skill, and slam dunks—basketball is the ultimate showcase of team dynamics and individual brilliance.",
    tempImg: "/images/landing/sports/basketball.png",
  },
  {
    title: "Powerlifting",
    description:
      "In the world of powerlifting, it’s all about raw strength and mental toughness—where the barbell is a test of will, and every lift is a statement of power.",
    tempImg: "/images/landing/sports/powerlifting.png",
  },
  {
    title: "Cricket",
    description:
      "Cricket is a game of centuries and split-second decisions, where strategy and skill blend to create moments of brilliance on the pitch.",
    tempImg: "/images/landing/sports/cricket.png",
  },
  {
    title: "Volleyball",
    description:
      "Volleyball is a game of height, hustle, and heart, where the net separates but the spirit unites in every spike, set, and block.",
    tempImg: "/images/landing/sports/volleyball.png",
  },
  {
    title: "Table Tennis",
    description:
      "The thrill of table tennis lies in its lightning-fast exchanges and razor-sharp reflexes—a game where every spin and smash can turn the tide.",
    tempImg: "/images/landing/sports/table_tennis.png",
  },
  {
    title: "Lawn Tennis",
    description:
      "On the lawn tennis court, every serve is a challenge and every rally a test of endurance, skill, and sheer willpower.",
    tempImg: "/images/landing/sports/lawn_tennis.png",
  },
  {
    title: "Squash",
    description:
      "Squash is the ultimate test of speed and stamina, where every wall is an opportunity, and every shot is a test of reflexes and strategy.",
    tempImg: "/images/landing/sports/squash.png",
  },
  {
    title: "Chess",
    description:
      "Chess is the battlefield of the mind, where every move is calculated, every piece a soldier, and the ultimate prize is a checkmate.",
    tempImg: "/images/landing/sports/chess.png",
  },
  {
    title: "Valorant (E-Sport)",
    description:
      "In Valorant, precision and strategy are your weapons—where every round is a fight for dominance in a world where only the sharpest minds and quickest reflexes survive.",
    tempImg: "/images/landing/sports/valorant.png",
  },
  {
    title: "Futsal",
    description:
      "In Futsal, agility and teamwork are your keys to victory—where fast-paced play and quick decisions on the court define the game, making every match a thrilling battle for supremacy.",
    tempImg: "/images/landing/sports/futsal.png",
  },
];

function SportsSection() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const translateLeft = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const translateRight = useTransform(scrollYProgress, [0, 1], [100, 400]);

  if (isMobile) {
    return (
      <Flex flexDir="column" maxW="60rem" mx="auto">
        {sportsEvents.map((sport, i) => (
          <MobileStackedSportEvent key={i} {...sport} index={i} />
        ))}
      </Flex>
    );
  }

  return (
    <>
      {/* <Flex
        gap={0}
        fontSize={{ base: "40px", md: "60px" }}
        whiteSpace="nowrap"
        textTransform="uppercase"
        fontFamily="Migra"
        fontWeight={800}
        fontStyle="italic"
        color="#F4AC17"
        flexDir="row"
        justifyContent="flex-start"
        w="100vw"
        overflowX="hidden" // Fix to prevent horizontal overflow
        position="relative"
        pb="8rem"
        left="50%" // Center the text within the viewport
        ml="-50vw" // Ensure the text starts from the left edge of the viewport
      >
        <MotionFlex
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 250, ease: "linear", repeat: Infinity }}
          display="flex"
          flexShrink={0}
          gap={4}
          position="absolute"
        >
          {[...Array<number>(100)].map((_, index) => (
            <Box key={index} display="flex" flexDir="row" gap={4}>
              <Text>Events</Text>
              <Text color="#121212" {...textBorder("#F4AC17")}>
                Events
              </Text>
            </Box>
          ))}
        </MotionFlex>
      </Flex> */}
      <Flex mt="4rem" flexDir="column" alignItems="center" mx="auto" gap={16}>
        <Grid
          maxW="90%"
          templateColumns="repeat(7, 1fr)"
          templateRows="repeat(2, 1fr)"
          gap={8}
          ref={ref}
          transform="scale(1.3)"
        >
          {sportsEvents.slice(0, 7).map((sport, i) => (
            <MotionGridItem
              key={i}
              style={{
                x: translateLeft,
              }}
              transition={{ duration: 0.5 }}
            >
              <Box position="relative" overflow="hidden" borderRadius="md">
                <Image
                  src={sport.tempImg}
                  alt={sport.title}
                  width={400}
                  height={400}
                  objectFit="cover"
                />
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  width="100%"
                  bg="rgba(0, 0, 0, 0.5)"
                  color="white"
                  textAlign="center"
                  p={2}
                >
                  <Text fontSize="lg" fontWeight="bold">
                    {sport.title}
                  </Text>
                </Box>
              </Box>
            </MotionGridItem>
          ))}

          {sportsEvents.slice(7, 13).map((sport, i) => (
            <MotionGridItem
              key={i + 7}
              style={{
                x: translateRight,
              }}
              transition={{ duration: 0.5 }}
            >
              <Box position="relative" overflow="hidden" borderRadius="md">
                <Image
                  src={sport.tempImg}
                  alt={sport.title}
                  width={400}
                  height={400}
                  objectFit="cover"
                />
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  width="100%"
                  bg="rgba(0, 0, 0, 0.5)"
                  color="white"
                  textAlign="center"
                  p={2}
                >
                  <Text fontSize="lg" fontWeight="bold">
                    {sport.title}
                  </Text>
                </Box>
              </Box>
            </MotionGridItem>
          ))}
        </Grid>
      </Flex>
    </>
  );
}

export default SportsSection;
