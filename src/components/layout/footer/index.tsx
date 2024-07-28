import Image from "next/image";
import { Box, Text, Link, Flex, Grid, Spacer } from "@chakra-ui/react";
import { navItems } from "../header/navbar";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export const socialLinks = [
  {
    title: "Facebook",
    href: "#",
    Icon: FaFacebookF,
  },
  {
    title: "LinkedIn",
    href: "#",
    Icon: FaLinkedinIn,
  },
  {
    title: "Instagram",
    href: "#",
    Icon: FaInstagram,
  },
  {
    title: "Youtube",
    href: "#",
    Icon: FaYoutube,
  },
];

function Footer() {
  return (
    <Box
      px={{ base: 8, md: 12 }}
      py={{ base: 8, md: 12 }}
      bgColor="#F4AC17"
      position="relative"
    >
      <div className="max-w-screen-2xl mx-auto">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDirection={["column", "row"]}
          p={[4, 4]}
        >
          <Link href="/">
            <Image
              src="/images/surge_logo_black.png"
              width={256}
              height={75}
              alt="Surge Logo"
            />
          </Link>
          <Grid
            templateColumns={[
              `repeat(${socialLinks.length}, 1fr)`,
              `repeat(${socialLinks.length}, 1fr)`,
            ]}
            gap={4}
            mt={[4, 0]}
          >
            {socialLinks.map(({ title, href, Icon }, i) => (
              <Box
                as={Link}
                key={i}
                href={href}
                target="_blank"
                bgColor="#815b0c"
                p={4}
                borderRadius="50%"
                transition="all .1s ease-in"
                _hover={{
                  bgColor: "#b88418",
                }}
              >
                <Icon />
              </Box>
            ))}
          </Grid>
        </Flex>
        <Spacer h={{ base: "2rem", md: "4rem" }} />
        <Text fontSize="xs" textAlign="left">
          © Copyright 2024 Surge
        </Text>
        <Text fontSize="xs" textAlign="left">
          Shiv Nadar University, Greater Noida
        </Text>
      </div>
    </Box>
  );
}

export default Footer;
