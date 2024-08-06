import Image from "next/image";
import { Flex, Box, Text, Grid, GridItem, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { chakra } from '@chakra-ui/react';
import { textBorder } from "./stats";
import { relative } from "path";

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
    <Flex mt="6rem" flexDir="column" alignItems="center" justifyContent="center">
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
            Sponsors
          </Text>
          <Text >Sponsors</Text>
          <Text color="#121212" {...textBorder("#F4AC17")}>
            Sponsors
          </Text>
          <Text >Sponsors</Text>
          <Text color="#121212" {...textBorder("#F4AC17")}>
            Sponsors
          </Text>
          <Text pr={4}>Sponsors</Text>
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
            Sponsors
          </Text>
          <Text >Sponsors</Text>
          <Text color="#121212" {...textBorder("#F4AC17")}>
            Sponsors
          </Text>
          <Text >Sponsors</Text>
          <Text color="#121212" {...textBorder("#F4AC17")} >
            Sponsors
          </Text>
          <Text pr={4}>Sponsors</Text>
        </MotionFlex>
      </Flex>

      <Grid 
        gap={25}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
        templateRows={{ base: "repeat(2, 1fr)", md: "1fr" }}
        justifyContent="space-evenly"
        alignItems="center"
        w="100vw"
      >
        {sponsors.map(({ title, image, href }, i) => (
          <Flex flexDir="column" justifyContent="center" alignItems="center">
          <Link
            key={i}
            href={href}
            isExternal
            filter="grayscale(100%)"
            transition="all .2s ease-in"
            _hover={{
              filter: "none",
            }}
            mt={{ base: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem", xl: "4rem" }}
          >
            <Flex

              w={{ base: "300px", sm: "200px", md: "150px", lg: "175px", xl: "200px" }}
              h={{ base: "150px", sm: "100px", md: "75px", lg: "87.5px", xl: "100px" }}
              // position="relative"
              flexDir="column"
              justifyContent="space-evenly"
              alignItems="center"
              flexWrap="wrap"
              position="relative"
            >
              <Image layout="fill" objectFit="fill" alt={title} src={image} />
            </Flex>
          </Link>
          </Flex>

        ))}

      </Grid>
    </Flex>
  );
}

export default SponsorsSection;
