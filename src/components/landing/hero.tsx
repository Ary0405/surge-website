import { Flex, Box, Text, Button } from "@chakra-ui/react";
import Image from "next/image";

function HeroSection() {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      mx="auto"
      background="url('/images/landing/hero/translucent_sportsperson_bg.png')"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <Text
        mt="10rem"
        fontFamily="Alfa Slab One"
        fontWeight={400}
        fontSize={80}
        textTransform="uppercase"
        textAlign="center"
      >
        We are the home of
        <br />
        <Box as="span" color="#F4AC17">
          champions
        </Box>
      </Text>

      <Text mt="2rem" fontSize={18} textAlign="center" maxW="70%">
        Whole-heartedly focused on the growing sports ambition on campus,
        everyone from athletes to fans will be a part of this 3-day fiesta of
        fulfilled dreams in the form of tournaments, one-on-one battles, and
        exertion both physical and mental, as records are formed and broken.
      </Text>

      <Button
        mt="3rem"
        p={8}
        fontSize={20}
        colorScheme="yellow"
        color="#fff"
        bgColor="#F4AC17"
        _hover={{
          bgColor: "#815B0B",
        }}
      >
        Bookings opening soon
      </Button>

      <Image
        width={400}
        height={1}
        alt=""
        src="/images/landing/hero/date_text.png"
        style={{ marginTop: "3rem" }}
      />

      <Text mt="1rem" fontSize={18} textAlign="center" maxW="70%">
        Scroll for more
      </Text>

      <Image
        width={40}
        height={1}
        alt=""
        src="/images/landing/hero/scroll_down_button.png"
        style={{ marginTop: "1rem", marginBottom: "3rem" }}
      />
    </Flex>
  );
}

export default HeroSection;
