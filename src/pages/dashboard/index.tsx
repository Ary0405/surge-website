import {
  Box,
  Button,
  Flex,
  Spacer,
  Icon,
  Text,
  Badge,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  FaCalendarAlt,
  FaHotel,
  FaListAlt,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { Layout } from "~/components/layout";
import { textBorder } from "~/components/landing/stats";
import { Global } from "@emotion/react";
import { api } from "~/utils/api";

function Dashboard() {
  const router = useRouter();
  const { data: cartItems } = api.reg.getCart.useQuery();
  const { data: userProfile, isLoading } = api.reg.getUserProfile.useQuery();
  const cartItemCount = cartItems?.length ?? 0;

  if (isLoading) {
    return (
      <Layout title="Dashboard">
        <Box display="flex" justifyContent="center" alignItems="center" my={12}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#F4AC17"
            size="xl"
          />
        </Box>
      </Layout>
    );
  }

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

      {/* Profile Information Box */}
      <Box
        mx="13rem"
        mb={16}
        p={10}
        borderWidth={1}
        borderRadius="lg"
        bg="#181818"
        color="white"
      >
        <Flex alignItems="center" mb={8}>
          <Icon as={FaUser} w={8} h={8} mr={4} />
          <Text fontSize="lg" fontWeight="bold">
            Personal Information
          </Text>
        </Flex>
        <VStack spacing={4} align="start">
          <Flex justifyContent="space-between" width="100%">
            <Text fontWeight="bold">Name</Text>
            <Text>{userProfile?.name}</Text>
          </Flex>
          <Flex justifyContent="space-between" width="100%">
            <Text fontWeight="bold">Email</Text>
            <Text>{userProfile?.email}</Text>
          </Flex>
          <Flex justifyContent="space-between" width="100%">
            <Text fontWeight="bold">College Name</Text>
            <Text>{userProfile?.collegeName}</Text>
          </Flex>
          <Flex justifyContent="space-between" width="100%">
            <Text fontWeight="bold">Roll Number</Text>
            <Text>{userProfile?.rollNumber}</Text>
          </Flex>
          <Flex justifyContent="space-between" width="100%">
            <Text fontWeight="bold">Phone Number</Text>
            <Text>{userProfile?.phone}</Text>
          </Flex>
        </VStack>
      </Box>

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
          onClick={() => router.push("/dashboard/all-events")}
        >
          <Icon as={FaCalendarAlt} w={16} h={16} mb={4} />
          All Events
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
