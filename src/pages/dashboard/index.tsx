import { Box, Button, Flex, Spacer, Icon, Text, Badge } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaCalendarAlt, FaHotel, FaShoppingCart } from "react-icons/fa";
import { Layout } from "~/components/layout";
import { textBorder } from "~/components/landing/stats";
import { Global } from "@emotion/react";
import { api } from "~/utils/api";

function Dashboard() {
  const router = useRouter();
  return (
    <Layout title="Dashboard">
      <Global
        styles={{
          body: {
            overflowX: "hidden",
          },
        }}
      />

      <Flex
        textTransform="uppercase"
        fontFamily="Migra"
        fontSize="100px"
        fontWeight={800}
        fontStyle="italic"
        color="#F4AC17"
        gap={4}
        left="50%"
        right="50%"
        ml="-50vw"
        mr="-50vw"
      >
        {[...Array<number>(8)].map((_, index) => (
          <Box key={index} display="flex" flexDir="row" gap={4}>
            <Text>Dashboard</Text>
            <Text color="#121212" {...textBorder("#F4AC17")}>
              Dashboard
            </Text>
          </Box>
        ))}
      </Flex>
      <Flex
        textTransform="uppercase"
        fontFamily="Migra"
        fontSize="100px"
        fontWeight={800}
        fontStyle="italic"
        color="#F4AC17"
        lineHeight="30px"
        gap={4}
        left="50%"
        right="50%"
        ml="-50vw"
        mr="-50vw"
        transform="translateX(400px)"
      >
        {[...Array<number>(8)].map((_, index) => (
          <Box key={index} display="flex" flexDir="row" gap={4}>
            <Text>Dashboard</Text>
            <Text color="#121212" {...textBorder("#F4AC17")}>
              Dashboard
            </Text>
          </Box>
        ))}
      </Flex>
      <Flex
        textTransform="uppercase"
        fontFamily="Migra"
        fontSize="100px"
        fontWeight={800}
        fontStyle="italic"
        color="#F4AC17"
        lineHeight="150px"
        gap={2}
        left="50%"
        right="50%"
        ml="-50vw"
        mr="-50vw"
        transform="translateX(-100px)"
      >
        {[...Array<number>(8)].map((_, index) => (
          <Box key={index} display="flex" flexDir="row" gap={4}>
            <Text>Dashboard</Text>
            <Text color="#121212" {...textBorder("#F4AC17")}>
              Dashboard
            </Text>
          </Box>
        ))}
      </Flex>

      <Flex justifyContent="flex-end" mx="25rem" mb={8}>
        <Button
          size="lg"
          colorScheme="yellow"
          color="white"
          bgColor="#F4AC17"
          width="200px"
          fontSize="xl"
          onClick={() => router.push("/dashboard/cart")}
          position="relative"
        >
          <Icon as={FaShoppingCart} w={8} h={8} position="relative"></Icon>
          <Text ml={4}>Cart</Text>
        </Button>
      </Flex>

      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        height="auto"
        gap={8}
        mt="4rem"
        mb={4}
      >
        <Button
          size="lg"
          colorScheme="yellow"
          color="white"
          bgColor="#F4AC17"
          width="350px"
          height="250px"
          fontSize="2xl"
          flexDirection="column"
          onClick={() => router.push("/dashboard/events")}
        >
          <Icon as={FaCalendarAlt} w={16} h={16} mb={4} />
          Events
        </Button>
        <Button
          size="lg"
          colorScheme="gray"
          width="350px"
          height="250px"
          fontSize="2xl"
          flexDirection="column"
          isDisabled={true}
        >
          <Icon as={FaHotel} w={16} h={16} mb={4} />
          Accommodation
        </Button>
      </Flex>

      <Spacer h="8rem" />
    </Layout>
  );
}

export default Dashboard;
