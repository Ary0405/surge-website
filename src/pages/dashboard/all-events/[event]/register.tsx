import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Stack,
  IconButton,
  Divider,
  useToast,
  FormControl,
  FormLabel,
  Spinner,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Layout } from "~/components/layout";
import { api } from "~/utils/api";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { validateEmail, validatePhone } from "~/utils/validators";

const EventRegistrationPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { event } = router.query;
  const eventName = Array.isArray(event) ? event[0] : event ?? "";

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
      gender: "",
    }))
  );

  const [closingTime, setClosingTime] = useState("");

  const closingDate = useMemo(() => new Date("2024-11-14T23:59:59"), []);

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const diff = closingDate.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (diff <= 0) {
      return "0d:0h:0m";
    }

    return `${days}d:${hours}h:${minutes}m`;
  }, [closingDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setClosingTime(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  useEffect(() => {
    if (data?.minPlayers) {
      setPlayers(
        Array.from({ length: data.minPlayers }, () => ({
          name: "",
          email: "",
          rollNumber: "",
          phone: "",
          gender: "",
        }))
      );
    }
  }, [data?.minPlayers]);

  const addPlayer = () => {
    if (players.length < (data?.maxPlayers ?? players.length)) {
      setPlayers([
        ...players,
        { name: "", email: "", rollNumber: "", phone: "", gender: "" },
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

  const validateEmails = () => {
    return players.every(
      (player) => validateEmail(player.email)
    );
  }

  const validatePhones = () => {
    return players.every(
      (player) => validatePhone(player.phone)
    );
  }

  const validateChessTeam = () => {
    // At least one female player
    return players.some((player) => player.gender === "female");
  };

  const handleSubmit = async () => {
    if (!data) return;

    if (!validateEmails()) {
      toast({
        title: "Invalid Email",
        description: "Please enter valid email addresses for all players.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!validatePhones()) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter valid phone numbers for all players.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

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

    if (data.name === 'Chess' && !validateChessTeam()) {
      toast({
        title: "Invalid Team",
        description: "Please ensure that there is at least one female player in the team.",
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
      void router.push("/dashboard"); // Redirect to dashboard or another page after successful registration
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
      <Flex
        maxW="5xl"
        mx="auto"
        py={8}
        px={6}
        bg="#181818"
        borderRadius="30px"
        border="1px solid #F4AC18"
        boxShadow="lg"
        mt={8}
        mb={8}
        maxH="80vh"
      >
        {/* Left Scrollable Form Section */}
        <Box flex="3" overflowY="auto" pr={6}>
          <Heading as="h1" size="2xl" color="#F4AC18" mb={8}>
            Register for {data.name}
          </Heading>

          <Stack spacing={6}>
            {players.map((player, index) => (
              <Box key={index}>
                <Flex justifyContent="space-between" alignItems="center" mb={4}>
                  <Heading as="h3" size="md" color="#F4AC18">{`Player ${index + 1}`}</Heading>
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
                    <FormLabel color="gray.400" fontSize="sm">Name</FormLabel>
                    <Input
                      placeholder="John Doe"
                      value={player.name}
                      onChange={(e) => handleInputChange(index, "name", e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel color="gray.400" fontSize="sm">Email</FormLabel>
                    <Input
                      placeholder="you@youruniversity.edu.in"
                      value={player.email}
                      type="email"
                      onChange={(e) => handleInputChange(index, "email", e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel color="gray.400" fontSize="sm">Roll Number</FormLabel>
                    <Input
                      placeholder="2210110001"
                      value={player.rollNumber}
                      onChange={(e) => handleInputChange(index, "rollNumber", e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel color="gray.400" fontSize="sm">Phone</FormLabel>
                    <Input
                      placeholder="9898989898"
                      value={player.phone}
                      onChange={(e) => handleInputChange(index, "phone", e.target.value)}
                    />
                  </FormControl>
                  {data.name === 'Chess' && (
                    <FormControl isRequired>
                      <FormLabel color="gray.400" fontSize="sm">Gender</FormLabel>
                      <Select
                        placeholder="Select Gender"
                        value={player.gender}
                        onChange={(e) => handleInputChange(index, "gender", e.target.value)}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Select>
                    </FormControl>
                  )}
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
        </Box>

        {/* Right Fixed Section */}
        <Box
          flex="1"
          borderLeft="1px solid #F4AC18"
          pl={6}
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {/* Event Date and Location */}
          <Box mb={8}>
            <Text fontSize="sm" color="gray.400" mb={1}>
              RUNS FROM
            </Text>
            <Text fontSize="l" color="gray.100" mb={6}>
              {new Date(data.dateFrom).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
              {" - "}
              {new Date(data.dateFrom).getMonth() ===
                new Date(data.dateTo).getMonth()
                ? new Date(data.dateTo).toLocaleDateString("en-US", {
                  day: "numeric",
                })
                : new Date(data.dateTo).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              {", "}
              {new Date(data.dateTo).getFullYear()}
            </Text>

            <Text fontSize="sm" color="gray.400" mb={1}>
              HAPPENING
            </Text>
            <Text fontSize="l" color="gray.100" mb={4}>
              {data.name === "Valorant"
                ? "Online"
                : "Indoor Sports Complex"}
            </Text>
          </Box>

          {/* Price and Cart Icon */}
          <Box mb={8}>
            <Flex justifyContent="space-between" alignItems="center">
              <Box>
                <Text fontSize="sm" color="gray.400">
                  Price
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  ₹{data.pricePerPlayer}
                </Text>
              </Box>

              <Box color="#F4AC18">
                <FaShoppingCart size="1.5em" />
              </Box>
            </Flex>

            {/* Description */}
            <Text fontSize="l" color="gray.100" mt={4}>
              Team Size: <b>{data.minPlayers}</b> -{" "}
              <b>{data.maxPlayers}</b>
            </Text>
            <Text fontSize="l" color="gray.100">
              Category: <b>{data.category}</b>
            </Text>
          </Box>

          {/* Add to Cart Button */}
          <Box mb={8}>
            <Button
              size="lg"
              bg="#F4AC18"
              color="white"
              width="full"
              _hover={{ bg: "#D49516" }}
              onClick={handleSubmit}
            >
              {createTeamMutation.status === "pending" ? "Registering..." : "Add to Cart"}
            </Button>
          </Box>

          {/* Registration Closing Timer */}
          <Box textAlign="center">
            <Text fontSize="sm" color="gray.400" mb={1}>
              REGISTRATION CLOSING IN
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="#F4AC18">
              {closingTime}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
};

export default EventRegistrationPage;
