import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";

import Navbar from "./navbar";
import MobileNavbarOverlay from "./mobile-navbar-overlay";

const MotionBox = motion(Box);
const MotionLink = motion(Link);
const MotionImage = motion(Image);

function Header() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <MotionBox
      as="header"
      position="relative"
      zIndex={2}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      px="4"
      h="10vh"
    >
      <div className="container flex items-center justify-between py-6 mx-auto">
        <MotionLink
          href="/"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <MotionImage
            src="/images/surge_logo.png"
            width={isMobile ? 190 : 256}
            height={1}
            alt="Surge Logo"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </MotionLink>

        {isMobile ? (
          <MobileNavbarOverlay />
        ) : (
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <Navbar />
          </MotionBox>
        )}
      </div>
    </MotionBox>
  );
}

export default Header;
