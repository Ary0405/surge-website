import React from "react";
import {
  Box,
  Heading,
  Text,
  Spacer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  Badge,
  Spinner,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Layout } from "~/components/layout";
import { api } from "~/utils/api";
import { FaClipboard } from "react-icons/fa";

const MyEventsPage = () => {
  const { data: myEvents, isLoading, isError } = api.reg.getMyEvents.useQuery();
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
      <Layout title="My Events">
        <Flex justifyContent="center" alignItems="center" height="50vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#F4AC18"
            size="xl"
          />
        </Flex>
      </Layout>
    );
  }

  if (isError || !myEvents) {
    return (
      <Layout title="My Events">
        <Text>Unable to load your events.</Text>
      </Layout>
    );
  }

  return (
    <Layout title="My Events" showFooter={false}>
      <Box maxW="4xl" mx="auto" py={8} px={6}>
        <Heading as="h1" size="2xl" mb={8} color="#F4AC18">
          My Events
        </Heading>

        {myEvents.length === 0 ? (
          <Text fontSize="lg">
            You haven&apos;t registered for any events yet.
          </Text>
        ) : (
          <Accordion allowToggle>
            {myEvents.map((team) => (
              <AccordionItem key={team.id}>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontSize="xl" color="#F4AC18">
                    {team.Event.name}
                  </Box>
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
                    Copy Verification URL
                  </Button>
                  <Badge
                    colorScheme={
                      team.PaymentDetails?.paymentStatus === "PAID"
                        ? "green"
                        : "yellow"
                    }
                    ml={2}
                  >
                    {team.PaymentDetails?.paymentStatus === "PAID"
                      ? "Completed"
                      : "Pending"}
                  </Badge>
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
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        <Spacer h="4rem" />
      </Box>
    </Layout>
  );
};

export default MyEventsPage;
