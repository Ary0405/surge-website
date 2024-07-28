import Image from "next/image";
import { Flex, Box, Text, Grid, GridItem, Link } from "@chakra-ui/react";

import { textBorder } from "./stats";

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
          Sponsors
        </Text>
        <Text>Sponsors</Text>
        <Text color="#121212" {...textBorder("#F4AC17")}>
          Sponsors
        </Text>
      </Flex>

      <Grid mt="1rem" templateColumns="repeat(4, 1fr)" gap={28}>
        {sponsors.map(({ title, image, href }, i) => (
          <Flex justifyContent="center" alignItems="center">
            <Link
              key={i}
              href={href}
              isExternal
              filter="grayscale(100%)"
              transition="all .2s ease-in"
              _hover={{
                filter: "none",
              }}
            >
              <Image width={150} height={200} alt={title} src={image} />
            </Link>
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
}

export default SponsorsSection;
