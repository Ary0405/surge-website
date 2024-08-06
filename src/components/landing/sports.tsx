import { Flex, Grid, GridItem, Text, Button, Box } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTransform, motion, useScroll } from "framer-motion";
import { set } from "zod";


const sports = [
  {
    title: "Tennis",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean maximus mi nec consectetur facilisis. Cras egestas dapibus velit, eget ultrices velit sodales at. Proin accumsan dui at dui lobortis, vel vestibulum sem ullamcorper. Cras eros justo, tincidunt sit amet sapien vitae, vulputate molestie odio. Vivamus pellentesque dui finibus tortor condimentum, at malesuada ligula semper. Nam viverra tellus et gravida dictum.",
    tempImg: "/images/landing/sports/tennis_stack.png",
  },
  {
    title: "Table Tennis",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean maximus mi nec consectetur facilisis. Cras egestas dapibus velit, eget ultrices velit sodales at. Proin accumsan dui at dui lobortis, vel vestibulum sem ullamcorper. Cras eros justo, tincidunt sit amet sapien vitae, vulputate molestie odio. Vivamus pellentesque dui finibus tortor condimentum, at malesuada ligula semper. Nam viverra tellus et gravida dictum.",
    tempImg: "/images/landing/sports/table_tennis_stack.png",
  },
  {
    title: "Basketball",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean maximus mi nec consectetur facilisis. Cras egestas dapibus velit, eget ultrices velit sodales at. Proin accumsan dui at dui lobortis, vel vestibulum sem ullamcorper. Cras eros justo, tincidunt sit amet sapien vitae, vulputate molestie odio. Vivamus pellentesque dui finibus tortor condimentum, at malesuada ligula semper. Nam viverra tellus et gravida dictum.",
    tempImg: "/images/landing/sports/basketball_stack.png",
  },
  {
    title: "Football",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean maximus mi nec consectetur facilisis. Cras egestas dapibus velit, eget ultrices velit sodales at. Proin accumsan dui at dui lobortis, vel vestibulum sem ullamcorper. Cras eros justo, tincidunt sit amet sapien vitae, vulputate molestie odio. Vivamus pellentesque dui finibus tortor condimentum, at malesuada ligula semper. Nam viverra tellus et gravida dictum.",
    tempImg: "/images/landing/sports/football_stack.png",
  },
  {
    title: "Volleyball",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean maximus mi nec consectetur facilisis. Cras egestas dapibus velit, eget ultrices velit sodales at. Proin accumsan dui at dui lobortis, vel vestibulum sem ullamcorper. Cras eros justo, tincidunt sit amet sapien vitae, vulputate molestie odio. Vivamus pellentesque dui finibus tortor condimentum, at malesuada ligula semper. Nam viverra tellus et gravida dictum.",
    tempImg: "/images/landing/sports/volleyball_stack.png",
  },
];

const MotionBox = motion(Box);

function SportsSection() {

  const sectionRefs = useRef<(HTMLElement | SVGElement | null)[]>([]);
  const sectionRef = useRef(null);
  const [height2, setHeight2] = useState(0);
  const [mt, setMt] = useState(0);


  const container2 = useRef(null);
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: container2,
    offset: ["start start", "end start"]
  })

  useEffect(() => {
    if (sectionRef.current) {
      const heightInPixels = sectionRef.current.offsetHeight;
      const heightInVh = (heightInPixels / window.innerHeight) * 100;
      if (100 - heightInVh <= 0) {
        setHeight2(100 - heightInVh);
        setMt(4);
      } else {
        const h = (100 - heightInVh) / 2;
        setHeight2(h);
        setMt(h);
      }
    }
  }, [setHeight2, setMt]);

  // const opacity = useTransform(scrollYProgress2, [0, 1], [1, 0]);
  console.log("sport height", height2);

  return (

    <Box alignItems="center"
    >
      {sports.map(({ title, description, tempImg }, i) => { 
        
        const start = Math.floor(i / sports.length);
        const end = Math.floor((i + 1) / sports.length);
        const nextStart = Math.floor((i + 2) / sports.length);

        const opacity = useTransform(scrollYProgress2, [start, end, nextStart], [0, 1, 0]);
        const visibility = useTransform(scrollYProgress2, [start, end, nextStart], ['hidden', 'visible', 'hidden']);



        const currentMt = i === 0 ? 4 : mt;
        return(

        <MotionBox
          key={i}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
          position="sticky" top={`${height2}vh`}
          mt={`${currentMt}rem`} flexDir="column" alignItems="center" mx="auto" gap={16}
          display="flex"
          style={{ visibility }}
        >

          <Grid
            key={i}
            maxW="75%"
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            templateRows="1fr"
            gap={4}
            ref={sectionRef}
          // h="100vh"

          // position="sticky" top="-20vh"
          >

            <GridItem
            >

              <Text
                mt={{ base: "1rem", sm: "2rem", md: "3rem", lg: "4rem", xl: "5rem" }}
                fontFamily="Alfa Slab One"
                fontWeight={600}
                textTransform="uppercase"
                fontSize={{ base: "40px", sm: "42.5px", md: "45px", lg: "47.5px", xl: "50px" }}
              >
                {title}
              </Text>
              <Box display={{ base: "block", md: "none" }} mt="1rem">
                <Image width={600} height={600} alt="" src={tempImg} />
              </Box>
              <Text mt="1rem" fontSize={{ base: "12px", sm: "13px", md: "14px", lg: "15px", xl: "16px" }}>
                {description}
              </Text>
              <Button
                mt={{ base: "1rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3rem" }}
                p={{ base: "2", sm: "4", md: "6", lg: "8", xl: "8" }}
                fontSize={{ base: "12px", sm: "13px", md: "14px", lg: "15px", xl: "16px" }}
                colorScheme="yellow"
                color="#fff"
                bgColor="#F4AC17"
                _hover={{
                  bgColor: "#815B0B",
                }}
              >
                Bookings opening soon
              </Button>
            </GridItem>
            <GridItem as={Flex} justifyContent="center" alignItems="center" display={{ base: "none", md: "flex" }}>
              <Image width={600} height={600} alt="" src={tempImg} />
            </GridItem>

          </Grid>
        </MotionBox>

      ) })}
    </Box>
  );
}

export default SportsSection;
