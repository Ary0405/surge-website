import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Badge,
  Spinner,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Layout } from "~/components/layout";

const VerifyPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const [team, setTeam] = useState<{
    eventName: string;
    collegeName: string;
    members: {
      id: string;
      name: string;
      uploadedCount: number;
      pendingCount: number;
    }[];
  } | null>(null);

  const {
    data: fetchedTeam,
    isLoading,
    isError,
  } = api.reg.getTeamByToken.useQuery(
    { token: token as string },
    {
      enabled: !!token, // only run query if token is present
    }
  );

  useEffect(() => {
    if (fetchedTeam) {
      setTeam({
        eventName: fetchedTeam.eventName,
        collegeName: fetchedTeam.collegeName,
        members: fetchedTeam.members.map((member) => ({
          id: member.id,
          name: member.name,
          uploadedCount: member.documents.filter(
            (doc) => doc.uploadStatus === "UPLOADED"
          ).length,
          pendingCount: member.documents.filter(
            (doc) => doc.uploadStatus !== "UPLOADED"
          ).length,
        })),
      });
    }
  }, [fetchedTeam]);

  if (isLoading) {
    return (
      <Layout title="Verification Portal">
        <Box display="flex" justifyContent="center" alignItems="center" my={12}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#F4AC18"
            size="xl"
          />
        </Box>
      </Layout>
    );
  }

  if (isError || !team) {
    return (
      <Layout title="Verification Portal">
        <Text>Unable to load the verification portal.</Text>
      </Layout>
    );
  }

  return (
    <Layout title="Verification Portal" showFooter={false}>
      <Box maxW="6xl" mx="auto" py={8} px={6}>
        <Heading as="h1" size="2xl" mb={8} color="#F4AC18">
          {team.collegeName} - {team.eventName}
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {team.members.map((member) => (
            <Box
              key={member.id}
              bgGradient="linear(to-b, #2e0202, #220202)"
              border="1px solid #F4AC18"
              borderRadius="lg"
              p={4}
              textAlign="center"
            >
              <VStack spacing={4}>
                <Text fontSize="lg" fontWeight="bold" color="white">
                  {member.name}
                </Text>

                <Badge
                  colorScheme={member.pendingCount === 0 ? "green" : "yellow"}
                  py={1}
                  px={4}
                  borderRadius="full"
                >
                  {member.pendingCount === 0
                    ? "Docs Uploaded"
                    : `${member.uploadedCount} of ${
                        member.uploadedCount + member.pendingCount
                      } Uploaded`}
                </Badge>

                <Link
                  href={`/verify/${token}/${member.id}`}
                  color="yellow.400"
                  mt={4}
                >
                  View & Upload Documents
                </Link>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Layout>
  );
};

export default VerifyPage;
