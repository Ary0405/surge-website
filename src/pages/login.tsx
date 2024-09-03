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
  FormErrorMessage,
  Spacer,
} from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { GetServerSidePropsContext } from "next";
import { signIn, getSession } from "next-auth/react";
import { Layout } from "~/components/layout";
import { textBorder } from "~/components/landing/stats";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (signInResponse?.ok) {
        void router.push("/dashboard");
      } else {
        setError(signInResponse?.error ?? "Login failed.");
      }
    } catch (error) {
      setError("Something went wrong.");
    }
  };

  return (
    <Layout title="Login">
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
        {[...Array<number>(8)].map((_, index) => (
          <Box key={index} display="flex" flexDir="row" gap={4}>
            <Text>Login</Text>
            <Text color="#121212" {...textBorder("#F4AC17")}>
              Login
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
            <Text>Login</Text>
            <Text color="#121212" {...textBorder("#F4AC17")}>
              Login
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
        transform="translateX(-100px)"
      >
        {[...Array<number>(8)].map((_, index) => (
          <Box key={index} display="flex" flexDir="row" gap={4}>
            <Text>Login</Text>
            <Text color="#121212" {...textBorder("#F4AC17")}>
              Login
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
            <FormControl id="email" isRequired isInvalid={!!error}>
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

            <FormControl id="password" isRequired isInvalid={!!error}>
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
              {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>

            <Button
              type="submit"
              colorScheme="yellow"
              bg="#F3AD18"
              color="black"
              width="full"
              mt={4}
            >
              Login
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center">
          Don&apos;t have an account?{" "}
          <Button
            variant="link"
            color="#F3AD18"
            onClick={() => router.push("/register")}
          >
            Register
          </Button>
        </Text>
      </Box>

      <Spacer h="10rem" />
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (session) {
    // Redirect to /dashboard if user is already logged in
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
