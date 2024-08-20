import { Flex, Box, Text, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const textBorder = (color: string) => ({
  textShadow: `1px 1px 0 ${color}, -1px 1px 0 ${color}, -1px -1px 0 ${color}, 1px -1px 0 ${color}`,
});

const MotionFlex = motion(Flex);

function StatsSection() {
  return (
    <Flex
      mt="6rem"
      flexDir="column"
      alignItems="center"
      mx="auto"
      overflowX="hidden"
      w="100vw"
      position="relative"
      left="50%"
      ml="-50vw"
    >
      <Flex
        gap={0}
        fontSize={{
          base: "40px",
          sm: "45px",
          md: "50px",
          lg: "55px",
          xl: "60px",
        }}
        whiteSpace="nowrap"
        textTransform="uppercase"
        fontFamily="Migra"
        fontWeight={800}
        fontStyle="italic"
        color="#F4AC17"
        flexDir="row"
        justifyContent="flex-start"
        w="100vw"
        position="relative"
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
            <>
              <Text>Scene in the game</Text>
              <Text color="#121212" {...textBorder("#F4AC17")}>
                Scene in the game
              </Text>
            </>
          ))}
        </MotionFlex>
      </Flex>

      <Grid
        mt="8rem"
        gap={10}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
        templateRows={{ base: "repeat(5, 1fr)", md: "1fr" }}
        justifyContent="space-evenly"
        alignItems="center"
        className="max-w-screen-2xl"
      >
        {[
          { title: "Teams", count: "109+" },
          { title: "Events", count: "17" },
          { title: "Players", count: "1500+" },
          { title: "Footfall", count: "15k+" },
          { title: "Sweat", count: "∞" },
        ].map(({ title, count }, i) => (
          <Flex
            key={i}
            flexDir="column"
            justifyContent="space-evenly"
            alignItems="center"
            fontSize={["45px", "55px"]}
            textTransform="uppercase"
            fontFamily="Migra"
            fontWeight={800}
            fontStyle="italic"
            color="#ffffff"
            flexWrap="wrap"
          >
            <Text fontStyle="normal" fontFamily="Poppins">
              {count}
            </Text>
            <Box>
              <Text>{title}</Text>
              {["#F4AC17", "#F4AC1750", "#F4AC1725"].map((color, j) => (
                <Text
                  key={j}
                  color="#121212"
                  {...textBorder(color)}
                  mt="-1.4rem"
                >
                  {title}
                </Text>
              ))}
            </Box>
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
}

export default StatsSection;
