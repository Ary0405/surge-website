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
      backgroundPosition="center"
    >
      <Text
        mt={{ base: "0rem", sm: "2.5rem", md: "5rem", lg: "7.5rem", xl: "10rem" }}
        fontFamily="Alfa Slab One"
        fontWeight={400}
        fontSize={{ base: "40px", sm: "50px", md: "60px", lg: "70px", xl: "80px" }}
        textTransform="uppercase"
        textAlign="center"
        lineHeight={1.1}
      >
        We are the
        <Box as="span" display={{ base: "block", md: "inline" }}>
          {"\u00A0"}home of
        </Box>
        <Box as="span" display={{ base: "block", md: "inline" }} color="#F4AC17">
          {"\u00A0"}champions
        </Box>
      </Text>

      <Text mt={{ base: "1rem", sm: "1.5rem", md: "2rem", lg: "2.5rem", xl: "3rem" }}
        fontSize={{ base: "14px", sm: "16px", md: "18px", lg: "20px", xl: "22px" }}
        lineHeight="1.3" textAlign="center" maxW="70%">
        Whole-heartedly focused on the growing sports ambition on campus,
        everyone from athletes to fans will be a part of this 3-day fiesta of
        fulfilled dreams in the form of tournaments, one-on-one battles, and
        exertion both physical and mental, as records are formed and broken.
      </Text>

      <Button
        mt={{ base: "1rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3rem" }}
        p={{ base: "2", sm: "4", md: "6", lg: "8", xl: "8" }}
        fontSize={{ base: "12px", sm: "16px", md: "18px", lg: "20px", xl: "20px" }}
        colorScheme="yellow"
        color="#fff"
        bgColor="#F4AC17"
        _hover={{
          bgColor: "#815B0B",
        }}
      >
        Bookings opening soon
      </Button>

      <Box
        width={{ base: "200px", sm: "250px", md: "300px", lg: "350px", xl: "400px" }}
        height={{ base: "22.5px", sm: "28.125px", md: "33.75px", lg: "39.375px", xl: "45px" }}
        marginTop={{ base: "1rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3rem" }}
        position="relative"
      // paddingTop="56.25%" 
      >
        <Image
          src="/images/landing/hero/date_text.png"
          alt="Description of image"
          layout="fill"
          objectFit="fill" 
        />
      </Box>

      <Text mt={{
        base: "0.5rem",
        sm: "0.625rem",
        md: "0.75rem",
        lg: "0.875rem",
        xl: "1rem"
      }}
        fontSize={{
          base: "14px",
          sm: "15px",
          md: "16px",
          lg: "17px",
          xl: "18px"
        }} textAlign="center" maxW="70%">
        Scroll for more
      </Text>
      <Box
      w={{
        base: "20px",
        sm: "22px",
        md: "24px",
        lg: "26px",
        xl: "28px"
      }}
      h={{
        base: "20px",
        sm: "22px",
        md: "24px",
        lg: "26px",
        xl: "28px"
      }}
      position="relative"
      mt={{
        base: "0.2rem",
        sm: "0.3.5rem",
        md: "0.5rem",
        lg: "0.6.5rem",
        xl: "0.8rem"
      }}
      mb={{ base: "1rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3rem" }}
      >
        <Image
          // width={40}
          // height={1}
          layout="fill" 
          objectFit="fill"
          alt=""
          src="/images/landing/hero/scroll_down_button.png"
          // style={{ marginTop: "1rem", marginBottom: "3rem" }}
        />
      </Box>
    </Flex>
  );
}

export default HeroSection;
