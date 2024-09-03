import { Box, Heading, Text, Link, Flex, Grid, VStack } from "@chakra-ui/react";
import { Layout } from "~/components/layout";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

// Social links configuration
const socialLinks = [
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
    title: "YouTube",
    href: "#",
    Icon: FaYoutube,
  },
];

function ContactPage() {
  return (
    <Layout title="Contact Us">
      <Box maxW="4xl" mx="auto" py={8} px={6}>
        <Heading as="h1" size="2xl" mb={8} color="#F4AC18">
          Contact Us
        </Heading>

        <VStack align="start" spacing={4}>
          <Text fontSize="lg">
            If you have any questions, feel free to reach out to us at:
          </Text>
          <Text fontSize="lg">
            <Link href="mailto:surge@snu.edu.in" color="#F4AC18" isExternal>
              surge@snu.edu.in
            </Link>
          </Text>

          <Text fontSize="lg" mt={8}>
            Follow us on social media:
          </Text>

          <Grid
            templateColumns={`repeat(${socialLinks.length}, 1fr)`}
            gap={6}
            mt={4}
          >
            {socialLinks.map(({ title, href, Icon }, i) => (
              <Box
                as={Link}
                key={i}
                href={href}
                target="_blank"
                p={4}
                borderRadius="50%"
                transition="all .1s ease-in"
                _hover={{
                  transform: "scale(1.1)",
                  bg: "#D49516",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bg="#F4AC18"
              >
                <Icon color="white" size="24px" />
              </Box>
            ))}
          </Grid>
        </VStack>
      </Box>
    </Layout>
  );
}

export default ContactPage;
