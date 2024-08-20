import Image from "next/image";
import { Flex, Box, Text, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { chakra } from "@chakra-ui/react";
import { textBorder } from "./stats";

const MotionFlex = motion(chakra.div);

function BlogsSection() {
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
              <Text>Surge blogs</Text>
              <Text color="#121212" {...textBorder("#F4AC17")}>
                Surge blogs
              </Text>
            </>
          ))}
        </MotionFlex>
      </Flex>

      <Grid
        mt="8rem"
        gap={32}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
        templateRows={{ base: "repeat(4, 1fr)", md: "1fr" }}
        justifyContent="space-evenly"
        alignItems="center"
        className="max-w-screen-2xl"
      >
        {[...Array(4).keys()].map((_, i) => (
          <Box position="relative" width="300px" height="400px" key={i}>
            <Image
              alt="Kobe Bryant"
              src="/images/landing/blogs/kobe_bryant.png"
              layout="fill"
              objectFit="cover"
            />
            <Box
              position="absolute"
              bottom="0"
              width="100%"
              bgGradient="linear(to-t, rgba(0, 0, 0, 0.9) 40%, transparent 100%)"
              color="white"
              textAlign="center"
              p={4}
            >
              <Text fontSize={25} fontWeight={600} color="#F4AC17">
                Examining Kobe Bryant&apos;s Legacy?
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </Flex>
  );
}

export default BlogsSection;
