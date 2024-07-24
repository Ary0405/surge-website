import Image from "next/image";
import { Flex, Box, Text, Grid } from "@chakra-ui/react";

import { textBorder } from "./stats";

function BlogsSection() {
  return (
    <Flex mt="6rem" flexDir="column" alignItems="center" mx="auto">
      <Flex
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
      </Flex>

      <Grid mt="1rem" templateColumns="repeat(4, 1fr)" gap={28}>
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
