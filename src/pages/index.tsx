import { Spacer, Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Layout } from "~/components/layout";
import { useScroll } from "framer-motion";

import HeroSection from "~/components/landing/hero";
import AftermovieSection from "~/components/landing/aftermovie";
import StatsSection from "~/components/landing/stats";
import SportsSection from "~/components/landing/sports";
import SponsorsSection from "~/components/landing/sponsors";
import BlogsSection from "~/components/landing/blogs";

function HomePage() {
  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 1.5,
  //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //     smooth: true,
  //     direction: "vertical",
  //     smoothTouch: true,
  //     touchMultiplier: 2,
  //     infinite: false,
  //   });

  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);

  //   return () => {
  //     // Cleanup function to stop the animation frame
  //     lenis.destroy();
  //   };
  // }, []);

  const [heroHeight, setHeroHeight] = useState(0);
  const [heroHeightVh, setHeroHeightVh] = useState(0);

  const container1 = useRef(null);
  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: container1,
    offset: [`start ${heroHeightVh + 10}vh`, "start start"],
  });

  // const container2 = useRef(null);
  // const { scrollYProgress:scrollYProgress2 } = useScroll({
  //   target: container2,
  //   offset: ["start end", "start start"]
  // })

  useEffect(() => {
    console.log(`HeroSection height in vh: ${heroHeight}vh`);
  }, [heroHeight]);

  return (
    <Box>
      <Layout title="Home">
        <Box position="sticky" top={`${heroHeight}vh`}>
          <HeroSection
            scrollYProgress1={scrollYProgress1}
            setHeight={setHeroHeight}
            setHeroHeightVh={setHeroHeightVh}
          />
        </Box>

        <Box ref={container1}>
          <AftermovieSection />
        </Box>

        <StatsSection />

        {/* <Box position="sticky" top={`${100 - heroHeight2}vh`} ref={container2}> */}
        <SportsSection />
        {/* </Box> */}

        <SponsorsSection />
        {/* <BlogsSection /> */}

        <Spacer h="5rem" />
      </Layout>
    </Box>
  );
}

export default HomePage;
