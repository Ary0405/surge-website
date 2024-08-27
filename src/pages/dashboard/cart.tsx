import React, { useState } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  useDisclosure,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { Layout } from "~/components/layout";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const CartPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    data: cartItems,
    isLoading,
    isError,
    refetch,
  } = api.reg.getCart.useQuery();
  const [transactionId, setTransactionId] = useState("");
  const finalizePaymentMutation = api.reg.finalizePayment.useMutation();

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

  const handlePayment = () => {
    onOpen();
  };

  const handleFinishPayment = async () => {
    try {
      const teamIds = cartItems.map((team) => team.id);
      await finalizePaymentMutation.mutateAsync({
        transactionId,
        teamIds,
      });
      toast({
        title: "Payment submitted successfully.",
        description: "Your payment is pending approval.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      refetch(); // Refetch the cart items to reflect the changes
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error submitting payment.",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const totalAmount = cartItems.reduce((total, team) => {
    return total + team.Event.pricePerPlayer * team.TeamMembers.length;
  }, 0);

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
            onClick={handlePayment}
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

        {/* Payment Modal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent bg="#1a1a1a" borderRadius="10px" maxW="500px">
            <ModalHeader color="#F4AC18" textAlign="center">
              Finish Payment
            </ModalHeader>
            <ModalCloseButton color="#F4AC18" />
            <ModalBody>
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                {/* Placeholder QR Code */}
                <Box
                  width="200px"
                  height="200px"
                  bg="gray.800"
                  mb={4}
                  borderRadius="10px"
                >
                  <Text
                    color="white"
                    textAlign="center"
                    lineHeight="200px"
                    fontSize="lg"
                  >
                    QR Code
                  </Text>
                </Box>
                <Text fontSize="3xl" fontWeight="bold" color="white" mb={4}>
                  Amount: Rs. {totalAmount}
                </Text>
                <Text fontSize="sm" color="gray.300" textAlign="left" mb={4}>
                  1. Scan the QR Code using any UPI app <br />
                  2. Make the payment of the amount shown above <br />
                  3. Once the payment is successful, put the UPI transaction ID
                  in the box below and press submit
                </Text>
                <Input
                  placeholder="Transaction ID"
                  size="lg"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  mb={4}
                  color="white"
                  bg="gray.900"
                  border="1px solid #F4AC18"
                />
              </Flex>
            </ModalBody>
            <ModalFooter justifyContent="center">
              <Button
                size="lg"
                bg="#F4AC18"
                color="white"
                boxShadow="lg"
                onClick={handleFinishPayment}
                _hover={{
                  bg: "#D49516",
                  boxShadow: "xl",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.3s ease"
              >
                Finish Payment
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Layout>
  );
};

export default CartPage;
