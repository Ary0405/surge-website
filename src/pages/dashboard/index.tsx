import { Box, Button, Flex, Spacer, Icon, Text, Badge } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  FaCalendarAlt,
  FaHotel,
  FaListAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { Layout } from "~/components/layout";
import { textBorder } from "~/components/landing/stats";
import { Global } from "@emotion/react";
import { api } from "~/utils/api";

function Dashboard() {
  const router = useRouter();
  const { data: cartItems } = api.reg.getCart.useQuery();
  const cartItemCount = cartItems?.length || 0;

  return (
    <Layout title="Dashboard">
      <Global
        styles={{
          body: {
            overflowX: "hidden",
          },
        }}
      />

      {/* Dashboard Text in Three Lines */}
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

      {/* Cart Button */}
      <Flex justifyContent="flex-end" mx="13rem" mb={8}>
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
          <Icon as={FaShoppingCart} w={8} h={8} position="relative" />
          <Text ml={4}>Cart</Text>
          {cartItemCount > 0 && (
            <Badge
              colorScheme="red"
              borderRadius="full"
              position="absolute"
              top="-5px"
              right="-5px"
              px={2}
              py={1}
              fontSize="xs"
            >
              {cartItemCount}
            </Badge>
          )}
        </Button>
      </Flex>

      {/* Dashboard Options */}
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        height="auto"
        gap={8}
        mt="4rem"
        mb={4}
      >
        {/* All Sports */}
        <Button
          size="lg"
          colorScheme="yellow"
          color="white"
          bgColor="#F4AC17"
          width="350px"
          height="250px"
          fontSize="2xl"
          flexDirection="column"
          onClick={() => router.push("/dashboard/sports")}
        >
          <Icon as={FaCalendarAlt} w={16} h={16} mb={4} />
          All Sports
        </Button>

        {/* My Events */}
        <Button
          size="lg"
          colorScheme="yellow"
          color="white"
          bgColor="#F4AC17"
          width="350px"
          height="250px"
          fontSize="2xl"
          flexDirection="column"
          onClick={() => router.push("/dashboard/my-events")}
        >
          <Icon as={FaListAlt} w={16} h={16} mb={4} />
          My Events
        </Button>

        {/* Accommodation */}
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
