import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Spacer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { Layout } from "~/components/layout";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const CartPage = () => {
  const router = useRouter();
  const { data: cartItems, isLoading, isError } = api.reg.getCart.useQuery();

  if (isLoading) {
    return (
      <Layout title="Cart">
        <Text>Loading...</Text>
      </Layout>
    );
  }

  if (isError || !cartItems) {
    return (
      <Layout title="Cart">
        <Text>Unable to load cart items.</Text>
      </Layout>
    );
  }

  return (
    <Layout title="Cart">
      <Box maxW="4xl" mx="auto" py={8} px={6}>
        <Heading as="h1" size="2xl" mb={8} color="#F4AC18">
          Your Cart
        </Heading>

        {cartItems.length === 0 ? (
          <Text fontSize="lg">Your cart is empty.</Text>
        ) : (
          <Accordion allowToggle>
            {cartItems.map((team) => (
              <AccordionItem key={team.id}>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontSize="xl" color="#F4AC18">
                    {team.Event.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
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
                        <Divider mt={4} />
                      </Box>
                    ))}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        <Spacer h="4rem" />

        <Flex justifyContent="space-between" mt={8}>
          <Button
            size="lg"
            colorScheme="gray"
            onClick={() => router.push("/dashboard")}
          >
            Back to Dashboard
          </Button>
          <Button
            size="lg"
            bg="#F4AC18"
            color="white"
            boxShadow="lg"
            _hover={{
              bg: "#D49516",
              boxShadow: "xl",
              transform: "translateY(-2px)",
            }}
            transition="all 0.3s ease"
          >
            Proceed to Payment
          </Button>
        </Flex>
      </Box>
    </Layout>
  );
};

export default CartPage;
