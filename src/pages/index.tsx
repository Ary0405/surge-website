import { Spacer } from "@chakra-ui/react";

import { Layout } from "~/components/layout";

import HeroSection from "~/components/landing/hero";
import AftermovieSection from "~/components/landing/aftermovie";
import StatsSection from "~/components/landing/stats";
import SportsSection from "~/components/landing/sports";
import SponsorsSection from "~/components/landing/sponsors";
import BlogsSection from "~/components/landing/blogs";

function HomePage() {
  return (
    <Layout title="Home">
      <HeroSection />
      <AftermovieSection />
      <StatsSection />
      <SportsSection />
      <SponsorsSection />
      <BlogsSection />

      <Spacer h="5rem" />
    </Layout>
  );
}

export default HomePage;
