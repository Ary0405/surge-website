import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
  Badge,
  Spacer,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { FaBasketballBall } from "react-icons/fa";
import { MdSportsCricket } from "react-icons/md";
import { PiSoccerBallDuotone } from "react-icons/pi";
import { MdOutlineSportsTennis } from "react-icons/md";

import { Layout } from "~/components/layout";

const sportsEvents = [
  { name: "Football", icon: PiSoccerBallDuotone, status: "NOT BOOKED" },
  { name: "Cricket", icon: MdSportsCricket, status: "NOT BOOKED" },
  { name: "Basketball", icon: FaBasketballBall, status: "NOT BOOKED" },
  { name: "Tennis", icon: MdOutlineSportsTennis, status: "NOT BOOKED" },
];

function Dashboard() {
  const { data: session } = useSession();
  const userName = session?.user?.name?.split(" ")[0] ?? "User";
  const [cart, setCart] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [playerCount, setPlayerCount] = useState<number>(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const addToCart = (event: string) => {
    if (!cart.includes(event)) {
      setCart([...cart, event]);
    }
  };

  const removeFromCart = (event: string) => {
    setCart(cart.filter((item) => item !== event));
  };

  const checkout = () => {
    alert(`Checking out with: ${cart.join(", ")}`);
    // Here you can add your checkout logic
  };

  const handleTileClick = (event: string) => {
    setSelectedEvent(event);
    setPlayerCount(1); // Reset player count when a new event is selected
    onOpen();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NOT BOOKED":
        return "red.500";
      case "PENDING":
        return "yellow.500";
      case "BOOKED":
        return "green.500";
      default:
        return "gray.500";
    }
  };

  return (
    <Layout title="Dashboard">
      <Heading ml={5} mb={2} fontSize={60}>
        Hello, {userName}.
      </Heading>
      <Text ml={5} mb={10} fontSize={16}>
        Use this dashboard to manage bookings, modify your players and make your
        experience at Surge 2024 incredible.
      </Text>
      <Text ml={5} fontSize={30} fontWeight={600}>
        Manage Sports
      </Text>
      <Flex direction="column" align="center" p={5}>
        <Grid templateColumns="repeat(4, 1fr)" gap={6} width="100%">
          {sportsEvents.map((event) => (
            <Box
              key={event.name}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              onClick={() => handleTileClick(event.name)}
              cursor="pointer"
              _hover={{ transform: "scale(1.05)" }}
              transition="0.2s"
            >
              <Flex direction="column" align="center">
                <event.icon size="40px" />
                <Text mt={2} fontSize="xl">
                  {event.name}
                </Text>
                <Badge mt={2} colorScheme={getStatusColor(event.status)}>
                  {event.status}
                </Badge>
              </Flex>
            </Box>
          ))}
        </Grid>
      </Flex>
      <Spacer h="15rem" />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent border="1px solid #636363" backgroundColor="#1c1c1c">
          <ModalHeader>Book {selectedEvent}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2} fontSize={14} fontWeight={600}>
              Number of Players
            </Text>
            <Flex align="center">
              <Button
                onClick={() => setPlayerCount(playerCount - 1)}
                disabled={playerCount <= 1}
              >
                -
              </Button>
              <Input
                value={playerCount}
                readOnly
                textAlign="center"
                mx={2}
                width="50px"
              />
              <Button onClick={() => setPlayerCount(playerCount + 1)}>+</Button>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="yellow"
              onClick={() => {
                addToCart(selectedEvent!);
                onClose();
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}

export default Dashboard;
