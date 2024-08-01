import { Spacer, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Layout } from "~/components/layout";

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


  return (
    <Box >
    <Layout title="Home" >
      <HeroSection />
      <AftermovieSection />
      <StatsSection />
      <SportsSection />
      <SponsorsSection />
      <BlogsSection />

      <Spacer h="5rem" />
    </Layout>
    </Box>
  );
}

export default HomePage;
