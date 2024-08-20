import Image from "next/image";
import { Flex, Text, Grid, Box, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { chakra } from "@chakra-ui/react";
import { textBorder } from "./stats";

const MotionFlex = motion(chakra.div);

const sponsors = [
  {
    title: "HCL",
    image: "/images/landing/sponsors/hcltech.png",
    href: "https://www.hcltech.com/",
  },
  {
    title: "Stag",
    image: "/images/landing/sponsors/stag.webp",
    href: "https://stag.global/",
  },
  {
    title: "Wai Wai",
    image: "/images/landing/sponsors/wai_wai.png",
    href: "https://www.waiwaiglobal.com/",
  },
  {
    title: "Dassault Systemes",
    image: "/images/landing/sponsors/dassault_systemes.png",
    href: "https://www.3ds.com/",
  },
];

function SponsorsSection() {
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
            <Box key={index} display="flex" flexDir="row" gap={4}>
              <Text>Sponsors</Text>
              <Text color="#121212" {...textBorder("#F4AC17")}>
                Sponsors
              </Text>
            </Box>
          ))}
        </MotionFlex>
      </Flex>

      <Grid
        mt="8rem"
        gap={32}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
        justifyContent="space-evenly"
        alignItems="center"
      >
        {sponsors.map(({ title, image, href }, i) => (
          <Flex
            key={i}
            flexDir="column"
            justifyContent="center"
            alignItems="center"
          >
            <Link
              href={href}
              isExternal
              filter="grayscale(100%)"
              transition="all .2s ease-in"
              _hover={{ filter: "none" }}
            >
              <Flex
                w={{ base: "200px", md: "200px" }}
                h={{ base: "100px", md: "100px" }}
                flexDir="column"
                justifyContent="space-evenly"
                alignItems="center"
                position="relative"
              >
                <Image
                  layout="fill"
                  objectFit="contain"
                  alt={title}
                  src={image}
                />
              </Flex>
            </Link>
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
}

export default SponsorsSection;
