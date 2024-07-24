import { Layout } from "~/components/layout";

import HeroSection from "~/components/landing/hero";
import AftermovieSection from "~/components/landing/aftermovie";
import StatsSection from "~/components/landing/stats";
import SportsSection from "~/components/landing/sports";
import SponsorsSection from "~/components/landing/sponsors";

function HomePage() {
  return (
    <Layout title="Home">
      <HeroSection />
      <AftermovieSection />
      <StatsSection />
      <SportsSection />
      <SponsorsSection />
    </Layout>
  );
}

export default HomePage;
