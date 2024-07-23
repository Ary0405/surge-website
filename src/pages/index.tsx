import { Layout } from "~/components/layout";

import HeroSection from "~/components/landing/hero";
import AftermovieSection from "~/components/landing/aftermovie";
import StatsSection from "~/components/landing/stats";

function HomePage() {
  return (
    <Layout title="Home">
      <HeroSection />
      <AftermovieSection />
      <StatsSection />
    </Layout>
  );
}

export default HomePage;
