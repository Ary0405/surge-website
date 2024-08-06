import Image from "next/image";
import { Flex, Box, Text, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { chakra } from '@chakra-ui/react';
import { textBorder } from "./stats";

const MotionFlex = motion(chakra.div);

function BlogsSection() {
  return (
    <Flex mt="6rem" flexDir="column" alignItems="center" mx="auto" w="100vw">
      {/* <Flex
        gap={6}
        fontSize={60}
        whiteSpace="nowrap"
        textTransform="uppercase"
        fontFamily="Migra"
        fontWeight={800}
        fontStyle="italic"
        color="#F4AC17"
      >
        <Text color="#121212" {...textBorder("#F4AC17")}>
          Surge blogs
        </Text>
        <Text>Surge blogs</Text>
        <Text color="#121212" {...textBorder("#F4AC17")}>
          Surge blogs
        </Text>
      </Flex> */}
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
        overflowX="hidden"
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
            Surge blogs
          </Text>
          <Text >Surge blogs</Text>
          <Text color="#121212" {...textBorder("#F4AC17")}>
            Surge blogs
          </Text>
          <Text pr={4}>Surge blogs</Text>
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
            Surge blogs
          </Text>
          <Text >Surge blogs</Text>
          <Text color="#121212" {...textBorder("#F4AC17")} >
            Surge blogs
          </Text>
          <Text pr={4}>Surge blogs</Text>
        </MotionFlex>
      </Flex>

      
      <Grid mt="1rem" templateColumns="repeat(4, 1fr)" gap={28} overflowX="hidden">
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
                Examining Kobe Bryant's Legacy?
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </Flex>
  );
}

export default BlogsSection;
