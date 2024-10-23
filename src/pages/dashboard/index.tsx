import {
  Link,
  Avatar,
  Divider,
  Heading,
  Accordion,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  Badge,
  VStack,
  Spinner,
  StackDivider,
  useToast,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  FaClipboard,
  FaShoppingCart,
  FaUserCircle,
  FaTrophy,
  FaCheckCircle,
  FaExclamationTriangle
} from "react-icons/fa";
import { Layout } from "~/components/layout";
import { Global } from "@emotion/react";
import { api } from "~/utils/api";

import { Fragment } from "react";

function Dashboard() {
  const router = useRouter();
  const { data: cartItems } = api.reg.getCart.useQuery();
  const { data: userProfile, isLoading } = api.reg.getUserProfile.useQuery();
  const cartItemCount = cartItems?.length ?? 0;

  const { data: myEvents, isError } = api.reg.getMyEvents.useQuery();
  const toast = useToast();
  const [p_style, setStyle] = useState({
    
  });

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

      {/* Account information, cart, accomodation links */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mx="13rem"
        mt="5rem"
        mb={4}
        fontFamily="poppins"
      >
        <Flex
          justifyContent="flex-start"
          alignItems="center"
          gap={8}
        >
          <Flex gap={3} pr={3}>
            <Avatar name={userProfile?.name} bgColor="#F4AC17" />
            <Flex direction="column">
              <Text fontWeight="bold" >{userProfile?.name}</Text>
              <Text fontSize="xs">{userProfile?.email}</Text>
            </Flex>
          </Flex>
          <Text
            size="lg"
            colorScheme="gray"
            width="175px"
            fontSize="l"
            fontWeight="bold"
            color="#F4AC17"
          >
            {/* <Icon as={FaHotel} w={8} h={8} /> */}
            Account Information
          </Text>
          <Link
            size="lg"
            colorScheme="gray"
            width="175px"
            fontSize="l"
          >
            {/* <Icon as={FaHotel} w={8} h={8} /> */}
            <Text ml={4}>Accommodations</Text>
          </Link>
        </Flex>
        <Flex>
          <Icon as={FaShoppingCart} mt={1} />
          <Link
            size="lg"
            colorScheme="gray"
            // colorScheme="yellow"
            color="white"
            // bgColor="#F4AC17"
            width="50px"
            fontSize="l"
            fontWeight="bold"
            onClick={() => router.push("/dashboard/cart")}
          >
            <Text ml={2}>Cart</Text>
          </Link>
          {cartItemCount > 0 && (
            <Badge
              colorScheme="red"
              borderRadius="full"
              px={2}
              fontSize="s"
            >
              {cartItemCount}
            </Badge>
          )}
        </Flex>
      </Flex>


      {/* Profile Information Box */}
      <Box
        mx="13rem"
        mb={16}
        mt={10}
        borderWidth={1}
        borderRadius="lg"
        bg="#181818"
        color="white"
        borderColor='#868686'
        fontFamily="poppins"
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
          {/*<Flex justifyContent="space-between" width="100%" pr={5} pl={5}>*/}
          {/*  <Text fontWeight="bold" color={"#bababa"}>Roll Number</Text>*/}
          {/*  <Text>{userProfile?.rollNumber}</Text>*/}
          {/*</Flex>*/}
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
        fontFamily="poppins"
      >
        <Flex alignItems="center" p={5} pb={4}>
          <Icon as={FaTrophy} w={6} h={6} mr={4} color={"#F3AB17"} />
          <Text fontWeight="bold">
            My Events
          </Text>
        </Flex>
        <Divider borderColor='#868686' />
        {isError || !myEvents || myEvents.length === 0 ? (
          <Text fontSize="lg" textAlign="center" p={4}>
            You haven&apos;t registered for any events yet.
          </Text>
        ) : (
          <Accordion allowToggle>
            <TableContainer pt={1}>
              <Table variant="simple" fontFamily="poppins" >
                <Thead>
                  <Tr>
                    <Th textTransform="none" fontFamily="poppins" fontWeight="bold" color={"#F3AB17"} fontSize="lg">Event Name</Th>
                    <Th textTransform="none" fontFamily="poppins" fontWeight="bold" color={"#F3AB17"} fontSize="lg">Status</Th>
                    <Th textTransform="none" fontFamily="poppins" fontWeight="bold" color={"#F3AB17"} fontSize="lg">Verification</Th>
                    <Th textTransform="none" fontFamily="poppins" fontWeight="bold" color={"#F3AB17"} fontSize="lg">Share link</Th>
                    <Th textTransform="none" fontFamily="poppins" fontWeight="bold" color={"#F3AB17"} fontSize="lg">Player Details</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {myEvents.map((team) => (
                    <Fragment key={team.id}>
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
                          >
                            Share Link
                          </Button onClick=>
                        </Td>
                        <Td>
                          <Button />
                        </Td>
                      </Tr>
                      <Tr display="block" id={team.id + "Accordion"}>
                        <VStack align="start" spacing={4} as="td">
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
                      </Tr>
                    </Fragment>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Accordion>
        )}
      </Box>
    </Layout>
  );
}

export default Dashboard;