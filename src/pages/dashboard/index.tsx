import {
  Divider,
  Heading,
  Accordion,
  Box,
  Button,
  Flex,
  Spacer,
  Icon,
  Text,
  Badge,
  VStack,
  Spinner,
  StackDivider,
  useToast,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  FaCalendarAlt,
  FaClipboard,
  FaHotel,
  FaListAlt,
  FaShoppingCart,
  FaUserCircle,
  FaTrophy,
  FaCheckCircle,
  FaExclamationTriangle
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

  const { data: myEvents, isError } = api.reg.getMyEvents.useQuery();
  const toast = useToast();

  const handleCopyToClipboard = (verificationToken: string) => {
    const domain =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://surgesnu.in";
    const url = `${domain}/verify/${verificationToken}`;

    void navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Verification URL copied.",
        description: "The verification URL has been copied to your clipboard.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
  };
  if (isLoading) {
    return (
      <Layout title="Dashboard">
        {void ((isError || !myEvents) && <Text>Unable to load your events.</Text>)}
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
        borderWidth={1}
        borderRadius="lg"
        bg="#181818"
        color="white"
        borderColor='#868686'
      >
        <VStack borderColor='#868686' divider={<StackDivider borderColor='#868686' />} spacing={4} align="">
          <Flex alignItems="center" pr={5} pl={5} pt={5} >
            <Icon as={FaUserCircle} w={6} h={6} mr={4} color={"#F3AB17"} />
            <Text fontWeight="bold">
              Personal Information
            </Text>
          </Flex>
          <Flex justifyContent="space-between" width="100%" pr={5} pl={5}>
            <Text fontWeight="bold" color={"#bababa"}>Name</Text>
            <Text>{userProfile?.name}</Text>
          </Flex>
          <Flex justifyContent="space-between" width="100%" pr={5} pl={5}>
            <Text fontWeight="bold" color={"#bababa"}>Email</Text>
            <Text>{userProfile?.email}</Text>
          </Flex>
          <Flex justifyContent="space-between" width="100%" pr={5} pl={5}>
            <Text fontWeight="bold" color={"#bababa"}>College Name</Text>
            <Text>{userProfile?.collegeName}</Text>
          </Flex>
          <Flex justifyContent="space-between" width="100%" pr={5} pl={5}>
            <Text fontWeight="bold" color={"#bababa"}>Roll Number</Text>
            <Text>{userProfile?.rollNumber}</Text>
          </Flex>
          <Flex justifyContent="space-between" width="100%" pr={5} pl={5} pb={4}>
            <Text fontWeight="bold" color={"#bababa"}>Phone Number</Text>
            <Text>{userProfile?.phone}</Text>
          </Flex>
        </VStack>
      </Box>

      <Box
        mx="13rem"
        mb={16}
        borderWidth={1}
        borderRadius="lg"
        bg="#181818"
        color="white"
        borderColor='#868686'
      >
        <Flex alignItems="center" p={5} pb={4}>
          <Icon as={FaTrophy} w={6} h={6} mr={4} color={"#F3AB17"} />
          <Text fontWeight="bold">
            My Events
          </Text>
        </Flex>
        <Divider borderColor='#868686' />
        {myEvents.length === 0 ? (
          <Text fontSize="lg">
            You haven&apos;t registered for any events yet.
          </Text>
        ) : (
          <Accordion allowToggle>
            <TableContainer pt={1}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th textTransform="none" fontWeight="bold" color={"#F3AB17"} fontSize="lg">Event Name</Th>
                    <Th textTransform="none" fontWeight="bold" color={"#F3AB17"} fontSize="lg">Status</Th>
                    <Th textTransform="none" fontWeight="bold" color={"#F3AB17"} fontSize="lg">Verification</Th>
                    <Th textTransform="none" fontWeight="bold" color={"#F3AB17"} fontSize="lg">Share link</Th>
                    <Th textTransform="none" fontWeight="bold" color={"#F3AB17"} fontSize="lg">Player Details</Th>
                  </Tr>
                </Thead>
                {myEvents.map((team) => (
                  <AccordionItem key={team.id}>
                    <Tr>
                      <Td>
                        <Box flex="1" textAlign="left" fontSize="l" color="#F4AC18">
                          {team.Event.name}
                        </Box>
                      </Td>
                      <Td>
                        <Badge colorScheme="green" px={2} py={1} borderRadius="full">
                          <Icon as={FaCheckCircle} mr={1} />
                          Paid
                        </Badge>
                      </Td>
                      <Td>
                        <Badge px={2} py={1} borderRadius="full"
                          colorScheme={
                            team.PaymentDetails?.paymentStatus === "PAID"
                              ? "green"
                              : "yellow"
                          }
                          ml={2}
                        >
                          {team.PaymentDetails?.paymentStatus === "PAID"
                            ? (<Icon as={FaCheckCircle} mr={1} />)
                            : (<Icon as={FaExclamationTriangle} mr={1} />)}
                          {team.PaymentDetails?.paymentStatus === "PAID"
                            ? "Completed"
                            : "Pending"}
                        </Badge>
                      </Td>
                      <Td>
                        <Button
                          size="xs"
                          colorScheme="teal"
                          variant="ghost"
                          onClick={() =>
                            handleCopyToClipboard(team.verificationToken)
                          }
                          leftIcon={<FaClipboard />}
                          ml={2}
                        >
                          Share Link
                        </Button>
                      </Td>
                      <Td>
                        <AccordionButton>
                          <AccordionIcon />
                        </AccordionButton>
                      </Td>
                      <AccordionPanel pb={4}>
                        <VStack align="start" spacing={4}>
                          <Heading as="h3" size="md" color="#F4AC18">
                            Team Members
                          </Heading>
                          {team.TeamMembers.map((member, index) => (
                            <Box key={member.id}>
                              <Text fontSize="md">
                                <strong>Player {index + 1}:</strong> {member.name}
                              </Text>
                              <Text fontSize="md">Email: {member.email}</Text>
                              <Text fontSize="md">
                                Roll Number: {member.rollNumber}
                              </Text>
                              <Text fontSize="md">Phone: {member.phone}</Text>
                            </Box>
                          ))}
                        </VStack>
                      </AccordionPanel>
                    </Tr>
                  </AccordionItem>
                ))}
              </Table>
            </TableContainer>
          </Accordion>
        )}

        <Spacer h="4rem" />
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
