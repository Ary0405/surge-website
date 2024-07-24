import { Layout } from "~/components/layout";

import HeroSection from "~/components/landing/hero";
import AftermovieSection from "~/components/landing/aftermovie";
import StatsSection from "~/components/landing/stats";
import SportsSection from "~/components/landing/sports";

function HomePage() {
  return (
    <Layout title="Home">
      <HeroSection />
      <AftermovieSection />
      <StatsSection />
      <SportsSection />
    </Layout>
  );
}

export default HomePage;
