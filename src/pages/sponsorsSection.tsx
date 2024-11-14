// import { Flex } from "@chakra-ui/react";
import { Layout } from "~/components/layout";
import Image from "next/image";
import { Flex, Text, Grid, Box, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { chakra } from "@chakra-ui/react";
import { textBorder } from "~/components/landing/stats";

const MotionFlex = motion(chakra.div);

const sponsors = [
  {
    title: "HCL",
    image: "/images/landing/sponsors/hcltech.png",
    href: "https://www.hcltech.com/",
    level: "Title Sponsor"
  },
  {
    title: "Stag",
    image: "/images/landing/sponsors/stag.webp",
    href: "https://stag.global/",
    level: "Gear Partner"
  },
  {
    title: "Wai Wai",
    image: "/images/landing/sponsors/wai_wai.png",
    href: "https://www.waiwaiglobal.com/",
    level: "Snacking Partner"
  },
  {
    title: "Easemytrip",
    image: "/images/landing/sponsors/EaseMyTrip.png",
    href: "https://www.easemytrip.com/",
    level: "Travel Partner"
  },
  {
    title: "MyAdvice",
    image: "/images/landing/sponsors/myadvice.jpg",
    href: "https://myadvice.com/",
  },
  {
    title: "Sodexo",
    image: "/images/landing/sponsors/sodexo.png",
    href: "https://www.sodexo.com/",
    level: "Food Partner"
  },
];


export default function SponsorsSection() {
  return (
    <Layout>
      <Flex
        mt="6rem"
        flexDir="column"
        alignItems="center"
        mx="auto"
        overflowX="hidden"
        w="100%"
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
          // padding="20px"
          marginBottom="50px"
        >
          <MotionFlex
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 150, ease: "linear", repeat: Infinity }}
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
          gap={10}
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          justifyContent="space-evenly"
          alignItems="center"
          marginBottom="100px"
        >
          {sponsors.map(({ title, image, href }, i) => (
            <Flex
              key={i}
              flexDir="column"
              justifyContent="center"
              alignItems="center"
            >
              <Link href={href} isExternal transition="all .2s ease-in">
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
    </Layout>
  )
}