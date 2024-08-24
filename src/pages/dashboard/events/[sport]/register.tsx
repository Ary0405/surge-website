import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Stack,
  Spacer,
  IconButton,
  Divider,
  useToast,
  FormControl,
  FormLabel,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Layout } from "~/components/layout";
import { api } from "~/utils/api";
import { FaPlus, FaMinus } from "react-icons/fa";

const EventRegistrationPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { sport } = router.query;
  const eventName = Array.isArray(sport) ? sport[0] : sport || "";

  const { data, isLoading, isError } = api.reg.getEventDetails.useQuery({
    sportSlug: eventName ?? "",
  });

  const createTeamMutation = api.reg.createTeamWithMembers.useMutation();

  const [players, setPlayers] = useState(
    Array.from({ length: data?.minPlayers ?? 1 }, () => ({
      name: "",
      email: "",
      rollNumber: "",
      phone: "",
    }))
  );

  useEffect(() => {
    if (data?.minPlayers) {
      setPlayers(
        Array.from({ length: data.minPlayers }, () => ({
          name: "",
          email: "",
          rollNumber: "",
          phone: "",
        }))
      );
    }
  }, [data?.minPlayers]);

  const addPlayer = () => {
    if (players.length < (data?.maxPlayers ?? players.length)) {
      setPlayers([
        ...players,
        { name: "", email: "", rollNumber: "", phone: "" },
      ]);
    }
  };

  const removePlayer = (index: number) => {
    if (players.length > (data?.minPlayers ?? 1)) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const handleInputChange = (
    index: number,
    field: keyof (typeof players)[number],
    value: string
  ) => {
    const updatedPlayers = [...players];
    if (updatedPlayers[index]) {
      updatedPlayers[index][field] = value;
      setPlayers(updatedPlayers);
    }
  };

  const areAllFieldsFilled = () => {
    return players.every(
      (player) =>
        player.name.trim() !== "" &&
        player.email.trim() !== "" &&
        player.rollNumber.trim() !== "" &&
        player.phone.trim() !== ""
    );
  };

  const handleSubmit = async () => {
    if (!data) return;

    if (!areAllFieldsFilled()) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields for all players.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await createTeamMutation.mutateAsync({
        eventId: data.id,
        players: players,
      });
      toast({
        title: "Team registered successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/dashboard"); // Redirect to dashboard or another page after successful registration
    } catch (error) {
      toast({
        title: "Error registering team.",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <Flex justifyContent="center" alignItems="center" height="30vh">
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

  if (isError || !data) {
    return (
      <Layout>
        <Text>Event not found</Text>
      </Layout>
    );
  }

  const showRemoveButton = players.length > (data?.minPlayers ?? 1);

  return (
    <Layout title={`Register for ${data.name}`}>
      <Box
        maxW="2xl"
        mx="auto"
        py={8}
        px={6}
        bg="gray.900"
        borderRadius="30px"
        border="1px solid #F4AC18"
        boxShadow="lg"
        mt={8}
      >
        <Heading as="h1" size="2xl" color="#F4AC18" mb={8}>
          Register for {data.name}
        </Heading>

        <Stack spacing={6}>
          {players.map((player, index) => (
            <Box key={index}>
              <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Heading as="h3" size="md" color="#F4AC18">{`Player ${
                  index + 1
                }`}</Heading>
                {showRemoveButton && (
                  <IconButton
                    aria-label="Remove player"
                    icon={<FaMinus />}
                    colorScheme="red"
                    onClick={() => removePlayer(index)}
                  />
                )}
              </Flex>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel color="gray.400" fontSize="sm">
                    Name
                  </FormLabel>
                  <Input
                    placeholder="John Doe"
                    value={player.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color="gray.400" fontSize="sm">
                    Email
                  </FormLabel>
                  <Input
                    placeholder="you@youruniversity.edu.in"
                    value={player.email}
                    onChange={(e) =>
                      handleInputChange(index, "email", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color="gray.400" fontSize="sm">
                    Roll Number
                  </FormLabel>
                  <Input
                    placeholder="2210110001"
                    value={player.rollNumber}
                    onChange={(e) =>
                      handleInputChange(index, "rollNumber", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color="gray.400" fontSize="sm">
                    Phone
                  </FormLabel>
                  <Input
                    placeholder="+91 9898989898"
                    value={player.phone}
                    onChange={(e) =>
                      handleInputChange(index, "phone", e.target.value)
                    }
                  />
                </FormControl>
              </Stack>
              {index < players.length - 1 && <Divider mt={8} />}
            </Box>
          ))}

          {players.length < (data?.maxPlayers ?? players.length) && (
            <Button
              leftIcon={<FaPlus />}
              bg="#F4AC18"
              color="white"
              onClick={addPlayer}
              width="full"
              _hover={{ bg: "#D49516" }}
            >
              Add Player
            </Button>
          )}
        </Stack>

        <Spacer h="4rem" />

        <Flex justifyContent="space-between" mt={8}>
          <Button size="lg" colorScheme="gray" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            size="lg"
            bg="#F4AC18"
            color="white"
            onClick={handleSubmit}
            boxShadow="lg"
            _hover={{
              bg: "#D49516",
              boxShadow: "xl",
              transform: "translateY(-2px)",
            }}
            transition="all 0.3s ease"
          >
            {createTeamMutation.status === "pending"
              ? "Registering..."
              : "Add to Cart"}
          </Button>
        </Flex>
      </Box>

      <Spacer h="10rem" />
    </Layout>
  );
};

export default EventRegistrationPage;
