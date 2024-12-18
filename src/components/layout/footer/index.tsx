import Image from "next/image";
import { Box, Text, Link, Flex, Grid, Spacer } from "@chakra-ui/react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export const socialLinks = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/company/surge-snioe/",
    Icon: FaLinkedinIn,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/surge.snu?igsh=eDRtZ3Y3cGhmbnd0",
    Icon: FaInstagram,
  },
  {
    title: "YouTube",
    href: "https://youtube.com/@surge-shivnadaruniversity7421?feature=shared",
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
              src="/images/logo_hcl.png"
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
            {socialLinks.map(({ href, Icon }, i) => (
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
        <Text
          as={Link}
          href="mailto:surge@snu.edu.in"
          isExternal
          fontSize="xs"
          textAlign="left"
        >
          surge@snu.edu.in
        </Text>
      </div>
    </Box>
  );
}

export default Footer;
