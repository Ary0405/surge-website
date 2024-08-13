import { Flex, Grid, GridItem, Text, Image, Box } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface MobileStackedSportEventProps {
  title: string;
  description: string;
  tempImg: string;
  index: number;
}

function MobileStackedSportEvent({
  title,
  description,
  tempImg,
  index,
}: MobileStackedSportEventProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [index * 100, 0]);

  return (
    <Box
      as={motion.div}
      ref={ref}
      position="sticky"
      top={0}
      zIndex={index}
      style={{ y }}
      mb="5rem"
    >
      <Grid
        h={"48rem"}
        templateColumns="1fr"
        bgColor="#000"
        p={10}
        borderRadius={15}
        boxShadow="0px 4px 25px 2px rgba(0,0,0,0.25)"
      >
        <GridItem as={Flex} flexDir="column" alignItems="center">
          <Image
            width={250}
            height={350}
            alt={title}
            src={tempImg}
            style={{
              borderRadius: "10px",
            }}
          />
        </GridItem>
        <GridItem>
          <Text
            fontFamily="Alfa Slab One"
            fontWeight={600}
            fontSize={24}
            textTransform="uppercase"
          >
            {title}
          </Text>
          <Text mt={6}>{description}</Text>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default MobileStackedSportEvent;
