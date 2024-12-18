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
  Image,
  Checkbox,
  Spinner,
} from "@chakra-ui/react";
import { Layout } from "~/components/layout";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const CartPage = () => {
  const router = useRouter();
  const toast = useToast();
  const {
    isOpen: isPaymentOpen,
    onOpen: onPaymentOpen,
    onClose: onPaymentClose,
  } = useDisclosure();
  const {
    isOpen: isTermsOpen,
    onOpen: onTermsOpen,
    onClose: onTermsClose,
  } = useDisclosure();
  const {
    isOpen: isNoteOpen,
    onOpen: onNoteOpen,
    onClose: onNoteClose,
  } = useDisclosure();

  const {
    data: cartItems,
    isLoading,
    isError,
    refetch,
  } = api.reg.getCart.useQuery();

  const [transactionId, setTransactionId] = useState("");
  const finalizePaymentMutation = api.reg.finalizePayment.useMutation();
  const [checked, setChecked] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [spinner, setSpinner] = useState(false);
  const [checkout, setCheckout] = useState(true);

  const deleteFromCartMutation = api.reg.removeFromCart.useMutation();

  if (isLoading) {
    return (
      <Layout title="Cart">
        <Box display="flex" justifyContent="center" alignItems="center" zIndex={1000} position="fixed" top="0" left="0" right="0" bottom="0" bg="rgba(0, 0, 0, 0.5)">
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

  if (isError || !cartItems) {
    return (
      <Layout title="Cart">
        <Box display="flex" justifyContent="center" alignItems="center" zIndex={1000} position="fixed" top="0" left="0" right="0" bottom="0" bg="rgba(0, 0, 0, 0.5)">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#F4AC17"
            size="xl"
          />
          Unable to load cart items.
        </Box>
      </Layout>
    );
  }

  const handlePayment = () => {
    if (selectedTeams.length === 0) {
      toast({
        title: "No team selected.",
        description: "Please select at least one team to proceed.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onTermsOpen(); // Open the Terms and Conditions modal first
  };

  const handleRemoveFromCart = async (teamId: string) => {
    try {
      await deleteFromCartMutation.mutateAsync({ teamId });
      toast({
        title: "Item removed from cart.",
        description: "The item has been removed from your cart.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      void refetch(); // Refetch the cart items to reflect the changes
    } catch (error) {
      toast({
        title: "Error removing item from cart.",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleFinishPayment = async () => {
    setCheckout(false);
    if (!transactionId) {
      toast({
        title: "Transaction ID is required.",
        description: "Please enter the transaction ID.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setCheckout(true);
      return;
    }
    setSpinner(true);
    try {
      const teamIds = selectedTeams;
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
      onPaymentClose();
      void refetch(); // Refetch the cart items to reflect the changes
      onNoteOpen(); // Open the Important Note modal after payment
    } catch (error) {
      toast({
        title: "Error submitting payment.",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setSpinner(false);
    setCheckout(true);
  };

  const handleNoteAcknowledge = () => {
    onNoteClose(); // Close the Important Note modal
    void router.push("/dashboard"); // Redirect to the dashboard
  };

  const totalAmount = cartItems.reduce((total, team) => {
    for (const selectedTeam of selectedTeams) {
      if (team.id === selectedTeam) {
        if (team.Event.name === "Valorant") {
          return total + 599;
        }
        return total + team.Event.pricePerPlayer * team.TeamMembers.length;
      }
    }
    return total;
  }, 0);

  const handleSelectTeam = (teamId: string) => {
    if (selectedTeams.includes(teamId)) {
      setSelectedTeams(selectedTeams.filter((id) => id !== teamId));
    } else {
      setSelectedTeams([...selectedTeams, teamId]);
    }
  };

  return (
    <Layout title="Cart" showFooter={false}>
      <Box maxW="4xl" mx="auto" py={8} px={6}>
        <Heading as="h1" size="2xl" mb={8} color="#F4AC18">
          Your Cart
        </Heading>

        {spinner ? (
          <Box display="flex" justifyContent="center" alignItems="center" zIndex={1000} position="fixed" top="0" left="0" right="0" bottom="0" bg="rgba(0, 0, 0, 0.5)">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#F4AC17"
              size="xl"
            />
          </Box>
        ) : null}

        {cartItems.length === 0 ? (
          <Text fontSize="lg">Your cart is empty.</Text>
        ) : (
          <Accordion allowToggle>
            {cartItems.map((team) => (
              <div key={team.id}>
                <AccordionItem key={team.id}>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontSize="xl"
                      color="#F4AC18"
                      display="flex"
                      alignItems="center"
                    >
                      <Checkbox
                        colorScheme="yellow"
                        color="white"
                        border={"0.2px white"}
                        size="lg"
                        isChecked={selectedTeams.includes(team.id)}
                        onChange={() => handleSelectTeam(team.id)}
                        borderRadius={"10px"}
                        marginRight={2}
                      />
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
                        </Box>
                      ))}
                      <Divider mt={4} />
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleRemoveFromCart(team.id)}
                      >
                        Remove
                      </Button>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </div>
            ))}
            <br />
            <br />
            Total Amount: Rs. {totalAmount}
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
          {cartItems.length !== 0 ?
            (
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
            ) : null
          }
        </Flex>

        {/* Terms and Conditions Modal */}
        <Modal isOpen={isTermsOpen} onClose={onTermsClose} isCentered size="xl">
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent
            bg="#1a1a1a"
            borderRadius="10px"
            maxW={{ base: "90%", md: "800px" }}
            maxH="80vh"
            overflowY="auto"
          >
            <ModalHeader color="#F4AC18" textAlign="center">
              Terms and Conditions
            </ModalHeader>
            <ModalCloseButton color="#F4AC18" />
            <ModalBody>
              <Text fontSize="sm" color="gray.300" textAlign="left" mb={4}>
                <strong>Referee Decisions & Misconduct:</strong> Referees&apos;
                decisions are final and non-contestable. The University has a
                zero-tolerance policy towards harassment, and any such cases
                will lead to disqualification of the contingent.
                <br />
                <br />
                <strong>ID & Document Verification:</strong> All participants
                must provide valid Photo ID Proof (Aadhar/Passport/PAN Card), a
                University ID card, two passport-sized photos, and a University
                document proof (Bonafide Certificate/Fee Receipt) at
                registration. This is mandatory for age and university
                affiliation verification.
                <br />
                <br />
                <strong>Team Representation:</strong> Each team must represent a
                single college. All team members must be currently enrolled
                students of that college. Esports are an exception.
                <br />
                <br />
                <strong>Promotional Materials:</strong> Participants may be
                required to wear event-related paraphernalia
                (stickers/headbands/wristbands) for promotional purposes.
                Players may be recorded for promotional purposes. By
                participating in Surge, registrants consent to being recorded
                for social media promotion content. Videos recorded during the
                event are the intellectual property of Surge and may not be used
                for personal promotion.
                <br />
                <br />
                <strong>Behavioral Standards:</strong> Any misconduct on Shiv
                Nadar IoE grounds will be penalized as determined by the
                Organizing Committee. Damage to institutional property will be
                charged to the responsible player.
                <br />
                <br />
                <strong>Substance Policy:</strong> The possession or consumption
                of smoking, alcoholic, or tobacco products on campus is strictly
                prohibited. Violation will result in the confiscation of banned
                substances and a penalty of ₹300 per player, applicable to the
                entire team.
                <br />
                <br />
                <strong>Registration & Reporting:</strong> The registration fee
                is non-refundable, non-transferable, and non-negotiable. Players
                must report to the registration desk at least two hours before
                their first match and arrive at the court/field 20 minutes
                before the match start time. A delay of more than 15 minutes
                will result in a walkover in favor of the opposing team.
                <br />
                <br />
                <strong>Prize Money:</strong> Prize money will be distributed
                based on the number of participants. This amount is final and
                not subject to negotiation.
                <br />
                <br />
                <strong>Rule Compliance:</strong> Failure to comply with any
                rule will result in the team&apos;s disqualification from Surge
                2023. All participants must adhere to the guidelines set forth
                by the Shiv Nadar IoE administration.
                <br />
                <br />
                <strong>Changes:</strong> Rules and schedules are subject to
                change. The final decision rests with the Surge Organizing
                Committee.
                <br />
                <br />
                <strong>Refund Policy:</strong> All registration fees are
                non-refundable and non-negotiable. By registering, participants
                agree that Surge is not liable for any refund disputes
                post-payment. All decisions regarding fees and refunds are
                final.
              </Text>
            </ModalBody>
            <ModalFooter justifyContent="space-evenly">
              <Checkbox
                colorScheme="yellow"
                isChecked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                color="white"
              >
                {" "}
                I agree to the terms and conditions
              </Checkbox>
              <Button
                size="lg"
                bg="#F4AC18"
                color="white"
                boxShadow="lg"
                isDisabled={!checked}
                onClick={() => {
                  onTermsClose();
                  onPaymentOpen();
                }}
                _hover={{
                  bg: "#D49516",
                  boxShadow: "xl",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.3s ease"
              >
                I Agree
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Payment Modal */}
        <Modal
          isOpen={isPaymentOpen}
          onClose={onPaymentClose}
          isCentered
          size="xl"
        >
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent
            bg="#1a1a1a"
            borderRadius="10px"
            maxW={{ base: "90%", md: "800px" }}
            maxH="80vh"
            overflowY="auto"
          >
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
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src="/images/qr.jpg"
                    alt="QR Code"
                    width="200px"
                    height="200px"
                  />
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
                isDisabled={!checkout}
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

        {/* Important Note Modal */}
        <Modal isOpen={isNoteOpen} onClose={onNoteClose} isCentered size="xl">
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent
            bg="#1a1a1a"
            borderRadius="10px"
            maxW={{ base: "90%", md: "800px" }}
            maxH="80vh"
            overflowY="auto"
          >
            <ModalHeader color="#F4AC18" textAlign="center">
              Important Note
            </ModalHeader>
            <ModalCloseButton color="#F4AC18" />
            <ModalBody>
              <Text fontSize="sm" color="gray.300" textAlign="left" mb={4}>
                It is mandatory to complete the verification process on the
                portal to get registered for Surge. Each player of a team/event
                must individually complete the verification process through the
                portal link shared by the first registrant.
                <br />
                <br />
                All players are required to upload a valid government ID Proof
                (DigiLocker), Passport-sized photographs, and a University
                document Proof (Bonafide Certificate/Fee receipt) on the
                verification portal.
                <br />
                <br />
                All participants are required to carry a hardcopy of all
                uploaded documents, including a signed affidavit from the
                University Sports Departments. This is to confirm your age and
                affiliation with a registered university.
              </Text>
            </ModalBody>
            <ModalFooter justifyContent="center">
              <Button
                size="lg"
                bg="#F4AC18"
                color="white"
                boxShadow="lg"
                onClick={handleNoteAcknowledge}
                _hover={{
                  bg: "#D49516",
                  boxShadow: "xl",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.3s ease"
              >
                Got It
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Layout>
  );
};

export default CartPage;
