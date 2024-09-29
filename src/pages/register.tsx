import { useState } from "react";
import { useRouter } from "next/router";
import {
  Flex,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { signIn } from "next-auth/react";
import { Layout } from "~/components/layout";
import { textBorder } from "~/components/landing/stats";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [collegeName, setCollegeName] = useState<string>("");
  const [rollNumber, setRollNumber] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear any previous errors

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          collegeName,
          rollNumber,
          phone,
        }),
      });

      if (response.ok) {
        // Automatically sign the user in after successful registration
        const signInResponse = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (signInResponse?.ok) {
          void router.push("/dashboard"); // Redirect to dashboard
        } else {
          setError("Sign-in after registration failed.");
        }
      } else {
        const errorData = (await response.json()) as { message: string };
        setError(errorData.message || "Registration failed.");
      }
    } catch (error) {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Register">
      <Global
        styles={{
          body: {
            overflowX: "hidden",
          },
        }}
      />
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
        {[...Array<number>(5)].map((_, index) => (
          <Box key={index} display="flex" flexDir="row" gap={4}>
            <Text>Register</Text>
            <Text color="#121212" {...textBorder("#F4AC17")}>
              Register
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
        {[...Array<number>(5)].map((_, index) => (
          <Box key={index} display="flex" flexDir="row" gap={4}>
            <Text>Register</Text>
            <Text color="#121212" {...textBorder("#F4AC17")}>
              Register
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
        gap={4}
        left="50%"
        right="50%"
        ml="-50vw"
        mr="-50vw"
        transform="translateX(-200px)"
      >
        {[...Array<number>(5)].map((_, index) => (
          <Box key={index} display="flex" flexDir="row" gap={4}>
            <Text>Register</Text>
            <Text color="#121212" {...textBorder("#F4AC17")}>
              Register
            </Text>
          </Box>
        ))}
      </Flex>

      <Box
        maxW="md"
        mx="auto"
        mt={8}
        p={6}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg="gray.800"
        color="white"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            {error && (
              <Box bg="red.500" p={2} borderRadius="md" color="white" w="full">
                {error}
              </Box>
            )}
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                bg="gray.700"
                borderColor="gray.600"
                focusBorderColor="#F3AD18"
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                bg="gray.700"
                borderColor="gray.600"
                focusBorderColor="#F3AD18"
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                bg="gray.700"
                borderColor="gray.600"
                focusBorderColor="#F3AD18"
              />
            </FormControl>

            <FormControl id="collegeName" isRequired>
              <FormLabel>College Name</FormLabel>
              <Input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                placeholder="Enter your college name"
                bg="gray.700"
                borderColor="gray.600"
                focusBorderColor="#F3AD18"
              />
            </FormControl>

            <FormControl id="rollNumber" isRequired>
              <FormLabel>Roll Number</FormLabel>
              <Input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Enter your roll number"
                bg="gray.700"
                borderColor="gray.600"
                focusBorderColor="#F3AD18"
              />
            </FormControl>

            <FormControl id="phone" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                bg="gray.700"
                borderColor="gray.600"
                focusBorderColor="#F3AD18"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="yellow"
              bg="#F3AD18"
              color="black"
              width="full"
              mt={4}
              isLoading={isLoading}
              loadingText="Registering"
              isDisabled={isLoading}
            >
              Register
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center">
          Already have an account?{" "}
          <Button
            variant="link"
            color="#F3AD18"
            onClick={() => router.push("/login")}
            isDisabled={isLoading}
          >
            Sign in
          </Button>
        </Text>
      </Box>

      <Spacer h="10rem" />
    </Layout>
  );
}
