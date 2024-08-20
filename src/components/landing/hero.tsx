import { Flex, Box, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useTransform, motion, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MotionBox = motion(Box);

function HeroSection({
  scrollYProgress1,
  setHeight,
  setHeroHeightVh,
}: {
  scrollYProgress1: MotionValue<number>;
  setHeight: (value: number) => void;
  setHeroHeightVh: (value: number) => void;
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      const heightInPixels = (sectionRef.current as HTMLElement).offsetHeight;
      const heightInVh = (heightInPixels / window.innerHeight) * 100;
      setHeroHeightVh(heightInVh);
      if (100 - heightInVh <= 0) {
        setHeight(100 - heightInVh);
      } else {
        setHeight(0);
      }
    }
  }, [setHeight]);

  const opacity = useTransform(scrollYProgress1, [0, 0.7], [1, 0]);

  return (
    // <Box position="sticky">
    <MotionBox style={{ opacity }}>
      <Flex
        flexDir="column"
        alignItems="center"
        background="url('/images/landing/hero/translucent_sportsperson_bg.png')"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        ref={sectionRef}
      >
        <Text
          mt={{
            base: "0rem",
            sm: "2.5rem",
            md: "5rem",
            lg: "7.5rem",
            xl: "10rem",
          }}
          fontFamily="Alfa Slab One"
          fontWeight={400}
          fontSize={{
            base: "40px",
            sm: "50px",
            md: "60px",
            lg: "60px",
            xl: "70px",
          }}
          textTransform="uppercase"
          textAlign="center"
          lineHeight={1.1}
        >
          <Box as="span" display={{ base: "block", md: "inline" }}>
            We are the
          </Box>
          <Box as="span" display={{ base: "block", md: "inline" }}>
            {"\u00A0"}home of
          </Box>
          <Box as="span" color="#F4AC17" display="block">
            {"\u00A0"}champions
          </Box>
        </Text>

        <Text
          mt={{
            base: "1rem",
            sm: "1.5rem",
            md: "2rem",
            lg: "2.5rem",
            xl: "3rem",
          }}
          fontSize={{
            base: "18px",
            sm: "19px",
            md: "20px",
            lg: "21px",
            xl: "22px",
          }}
          lineHeight="1.3"
          textAlign="center"
          maxW="80%"
        >
          Whole-heartedly focused on the growing sports ambition on campus,
          everyone from athletes to fans will be a part of this 3-day fiesta of
          fulfilled dreams in the form of tournaments, one-on-one battles, and
          exertion both physical and mental, as records are formed and broken.
        </Text>

        <Button
          mt={{
            base: "3rem",
            sm: "3.5rem",
            md: "4rem",
            lg: "4.5rem",
            xl: "5rem",
          }}
          p={{
            base: "24px",
            sm: "25.5px",
            md: "27px",
            lg: "28.5px",
            xl: "30px",
          }}
          fontSize={{
            base: "18px",
            sm: "16px",
            md: "18px",
            lg: "20px",
            xl: "20px",
          }}
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
          width={{
            base: "200px",
            sm: "250px",
            md: "300px",
            lg: "350px",
            xl: "400px",
          }}
          height={{
            base: "20x",
            sm: "25px",
            md: "30px",
            lg: "35px",
            xl: "40px",
          }}
          marginTop={{
            base: "1rem",
            sm: "2rem",
            md: "2.5rem",
            lg: "3rem",
            xl: "3rem",
          }}
          position="relative"
          // paddingTop="56.25%"
        >
          {/* <Image
            src="/images/landing/hero/date_text.png"
            alt="Description of image"
            layout="fill"
            objectFit="fill"
          /> */}
          <Text
            fontFamily="Migra"
            fontWeight={800}
            fontSize={["23px", "45px"]}
            fontStyle="italic"
            color="#F4AC17"
            textTransform="uppercase"
            textAlign="center"
          >
            3&nbsp;4&nbsp;5&nbsp;November&apos;24
          </Text>
        </Box>

        <Text
          mt={{
            base: "0.5rem",
            sm: "0.625rem",
            md: "0.75rem",
            lg: "0.875rem",
            xl: "1rem",
          }}
          fontSize={{
            base: "14px",
            sm: "15px",
            md: "16px",
            lg: "17px",
            xl: "18px",
          }}
          textAlign="center"
          maxW="70%"
        >
          Scroll for more
        </Text>
        <Box
          w={{
            base: "20px",
            sm: "22px",
            md: "24px",
            lg: "26px",
            xl: "28px",
          }}
          h={{
            base: "20px",
            sm: "22px",
            md: "24px",
            lg: "26px",
            xl: "28px",
          }}
          position="relative"
          mt={{
            base: "0.2rem",
            sm: "0.3.5rem",
            md: "0.5rem",
            lg: "0.6.5rem",
            xl: "0.8rem",
          }}
          mb={{
            base: "1rem",
            sm: "2rem",
            md: "2.5rem",
            lg: "3rem",
            xl: "3rem",
          }}
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
    </MotionBox>
    // </Box>
  );
}

export default HeroSection;
