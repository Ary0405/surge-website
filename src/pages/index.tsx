import { Layout } from "~/components/layout";

import HeroSection from "~/components/landing/hero";
import AftermovieSection from "~/components/landing/aftermovie";

function HomePage() {
  return (
    <Layout title="Home">
      <HeroSection />
      <AftermovieSection />
    </Layout>
  );
}

export default HomePage;
