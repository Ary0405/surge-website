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
    title: "Tennis",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean maximus mi nec consectetur facilisis. Cras egestas dapibus velit, eget ultrices velit sodales at. Proin accumsan dui at dui lobortis, vel vestibulum sem ullamcorper. Cras eros justo, tincidunt sit amet sapien vitae, vulputate molestie odio. Vivamus pellentesque dui finibus tortor condimentum, at malesuada ligula semper. Nam viverra tellus et gravida dictum.",
    tempImg: "/images/landing/sports/tennis_stack.png",
  },
  {
    title: "Table Tennis",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean maximus mi nec consectetur facilisis. Cras egestas dapibus velit, eget ultrices velit sodales at. Proin accumsan dui at dui lobortis, vel vestibulum sem ullamcorper. Cras eros justo, tincidunt sit amet sapien vitae, vulputate molestie odio. Vivamus pellentesque dui finibus tortor condimentum, at malesuada ligula semper. Nam viverra tellus et gravida dictum.",
    tempImg: "/images/landing/sports/table_tennis_stack.png",
  },
  {
    title: "Basketball",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean maximus mi nec consectetur facilisis. Cras egestas dapibus velit, eget ultrices velit sodales at. Proin accumsan dui at dui lobortis, vel vestibulum sem ullamcorper. Cras eros justo, tincidunt sit amet sapien vitae, vulputate molestie odio. Vivamus pellentesque dui finibus tortor condimentum, at malesuada ligula semper. Nam viverra tellus et gravida dictum.",
    tempImg: "/images/landing/sports/basketball_stack.png",
  },
  {
    title: "Football",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean maximus mi nec consectetur facilisis. Cras egestas dapibus velit, eget ultrices velit sodales at. Proin accumsan dui at dui lobortis, vel vestibulum sem ullamcorper. Cras eros justo, tincidunt sit amet sapien vitae, vulputate molestie odio. Vivamus pellentesque dui finibus tortor condimentum, at malesuada ligula semper. Nam viverra tellus et gravida dictum.",
    tempImg: "/images/landing/sports/football_stack.png",
  },
  {
    title: "Volleyball",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean maximus mi nec consectetur facilisis. Cras egestas dapibus velit, eget ultrices velit sodales at. Proin accumsan dui at dui lobortis, vel vestibulum sem ullamcorper. Cras eros justo, tincidunt sit amet sapien vitae, vulputate molestie odio. Vivamus pellentesque dui finibus tortor condimentum, at malesuada ligula semper. Nam viverra tellus et gravida dictum.",
    tempImg: "/images/landing/sports/volleyball_stack.png",
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
