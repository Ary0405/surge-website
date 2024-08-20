import {
  Flex,
  Grid,
  GridItem,
  Text,
  Button,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

import MobileStackedSportEvent from "./mobile-stacked-sport-event";

const sports = [
  {
    title: "Football",
    description:
      "Where every pass counts and every goal ignites the crowd—football is more than a game; it's a battle of strategy and stamina on the ultimate field of dreams.",
    tempImg: "/images/landing/sports/football_stack.png",
  },
  {
    title: "Badminton",
    description:
      "In a game where agility meets precision, badminton is a lightning-fast duel where every shuttlecock can change the course of victory.",
    tempImg: "/images/landing/sports/badminton_stack.png",
  },
  {
    title: "Athletics",
    description:
      "The pursuit of excellence begins on the track—athletics is the purest form of human speed, strength, and endurance, pushing the limits of what’s possible.",
    tempImg: "/images/landing/sports/athletics_stack.png",
  },
  {
    title: "Basketball",
    description:
      "Where the court is a canvas and each player paints with speed, skill, and slam dunks—basketball is the ultimate showcase of team dynamics and individual brilliance.",
    tempImg: "/images/landing/sports/basketball_stack.png",
  },
  {
    title: "Powerlifting",
    description:
      "In the world of powerlifting, it’s all about raw strength and mental toughness—where the barbell is a test of will, and every lift is a statement of power.",
    tempImg: "/images/landing/sports/powerlifting_stack.png",
  },
  {
    title: "Cricket",
    description:
      "Cricket is a game of centuries and split-second decisions, where strategy and skill blend to create moments of brilliance on the pitch.",
    tempImg: "/images/landing/sports/cricket_stack.png",
  },
  {
    title: "Volleyball",
    description:
      "Volleyball is a game of height, hustle, and heart, where the net separates but the spirit unites in every spike, set, and block.",
    tempImg: "/images/landing/sports/volleyball_stack.png",
  },
  {
    title: "Table Tennis",
    description:
      "The thrill of table tennis lies in its lightning-fast exchanges and razor-sharp reflexes—a game where every spin and smash can turn the tide.",
    tempImg: "/images/landing/sports/table_tennis_stack.png",
  },
  {
    title: "Lawn Tennis",
    description:
      "On the lawn tennis court, every serve is a challenge and every rally a test of endurance, skill, and sheer willpower.",
    tempImg: "/images/landing/sports/lawn_tennis_stack.png",
  },
  {
    title: "Squash",
    description:
      "Squash is the ultimate test of speed and stamina, where every wall is an opportunity, and every shot is a test of reflexes and strategy.",
    tempImg: "/images/landing/sports/squash_stack.png",
  },
  {
    title: "Chess",
    description:
      "Chess is the battlefield of the mind, where every move is calculated, every piece a soldier, and the ultimate prize is a checkmate.",
    tempImg: "/images/landing/sports/chess_stack.png",
  },
  {
    title: "Valorant (E-Sport)",
    description:
      "In Valorant, precision and strategy are your weapons—where every round is a fight for dominance in a world where only the sharpest minds and quickest reflexes survive.",
    tempImg: "/images/landing/sports/valorant_stack.png",
  },
  {
    title: "FIFA (E-Sport)",
    description:
      "FIFA brings the beautiful game to the digital arena, where every virtual kick, pass, and goal mirrors the intensity of real-world football passion.",
    tempImg: "/images/landing/sports/fifa_stack.png",
  },
];

const MotionImage = motion(Image);

interface SportSectionProps {
  title: string;
  description: string;
  onEnterViewport: () => void;
}

function SportSection({
  title,
  description,
  onEnterViewport,
}: SportSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const visibility = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  useEffect(() => {
    const unsubscribe = visibility.onChange((v) => {
      if (v > 0) {
        onEnterViewport();
      }
    });
    return () => unsubscribe();
  }, [visibility, onEnterViewport]);

  return (
    <Box ref={ref} mb={16}>
      <Text
        mt="5rem"
        fontFamily="Alfa Slab One"
        fontWeight={600}
        textTransform="uppercase"
        fontSize={50}
      >
        {title}
      </Text>
      <Text mt="1rem" fontSize={16}>
        {description}
      </Text>
      <Button
        mt="3rem"
        p={6}
        fontSize={16}
        colorScheme="yellow"
        color="#fff"
        bgColor="#F4AC17"
        _hover={{
          bgColor: "#815B0B",
        }}
      >
        Bookings opening soon
      </Button>
    </Box>
  );
}

function SportsSection() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [activeIndex, setActiveIndex] = useState(0);

  if (isMobile) {
    return (
      <Flex flexDir="column" maxW="60rem" mx="auto">
        {sports.map((sport, i) => (
          <MobileStackedSportEvent key={i} {...sport} index={i} />
        ))}
      </Flex>
    );
  }

  return (
    <Flex mt="4rem" flexDir="column" alignItems="center" mx="auto" gap={16}>
      <Grid
        maxW="75%"
        templateColumns="1fr 1fr"
        templateRows="auto 1fr"
        gap={8}
      >
        <GridItem>
          {sports.map(({ title, description }, i) => (
            <SportSection
              key={i}
              title={title}
              description={description}
              onEnterViewport={() => setActiveIndex(i)}
            />
          ))}
        </GridItem>
        <GridItem
          position="sticky"
          top="20%"
          as={Flex}
          justifyContent="center"
          alignItems="center"
          h="600px"
        >
          <MotionImage
            key={activeIndex} // Ensure the image transitions smoothly
            width={600}
            height={600}
            alt={sports[activeIndex]?.title ?? ""}
            src={sports[activeIndex]?.tempImg ?? ""}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          />
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default SportsSection;
