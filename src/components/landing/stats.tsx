import { Flex, Box, Text, Grid, GridItem, flexbox } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { chakra } from '@chakra-ui/react';

export const textBorder = (color: string) => ({
  textShadow: `1px 1px 0 ${color}, -1px 1px 0 ${color}, -1px -1px 0 ${color}, 1px -1px 0 ${color}`,
});

const MotionFlex = motion(chakra.div);


function StatsSection() {
  return (
    <Flex mt="6rem" flexDir="column" alignItems="center" mx="auto" overflowX="hidden">
      <Flex
        gap={0}
        fontSize={{ base: "40px", sm: "45px", md: "50px", lg: "55px", xl: "60px" }}
        whiteSpace="nowrap"
        textTransform="uppercase"
        fontFamily="Migra"
        fontWeight={800}
        fontStyle="italic"
        color="#F4AC17"
        flexDir="row"
        flexShrink={0}
        justifyContent="flex-start"
        w="100vw"
      >

        <MotionFlex
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          display="flex"
          flexShrink={0}
          
          gap={4}
          
          
        >
          <Text color="#121212" {...textBorder("#F4AC17")}>
            Scene in the game
          </Text>
          <Text >Scene in the game</Text>
          <Text color="#121212" {...textBorder("#F4AC17")}>
            Scene in the game
          </Text>
          <Text pr={4}>Scene in the game</Text>
        </MotionFlex>

        <MotionFlex
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          display="flex"
          flexShrink={0}
          gap={4}
          
          
        >
          <Text color="#121212" {...textBorder("#F4AC17")}>
            Scene in the game
          </Text>
          <Text >Scene in the game</Text>
          <Text color="#121212" {...textBorder("#F4AC17")} >
            Scene in the game
          </Text>
          <Text pr={4}>Scene in the game</Text>
        </MotionFlex>
      </Flex>

      <Grid
        mt={{base: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem", xl: "4rem" }}
        gap={10}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
        templateRows={{ base: "repeat(5, 1fr)", md: "1fr" }}
        justifyContent="space-evenly"
        alignItems="center"
        w="100vw"
      >
      {/* <Flex
        mt={{base: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem", xl: "4rem" }}
        gap={10}
        flexDir="row"
        justifyContent="space-evenly"
        alignItems="center"
        flexWrap="wrap"
        w="100vw"
      > */}
        {[
          { title: "Teams", count: "10" },
          { title: "Events", count: "1" },
          { title: "Players", count: "100" },
          { title: "Footfall", count: "1k" },
          { title: "Sweat", count: "∞" },
        ].
        map(({ title, count }, i) => (
          <Flex
            key={i}
            flexDir="column"
            justifyContent="space-evenly"
            alignItems="center"
            fontSize={{base: "65px", sm: "70px", md: "38px", lg: "43px", xl: "48px" }}
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
      {/* </Flex> */}
    </Flex>
  );
}

export default StatsSection;
