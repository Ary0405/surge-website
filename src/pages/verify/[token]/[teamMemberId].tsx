import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  VStack,
  Spinner,
  useToast,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaFileUpload } from "react-icons/fa";
import { api } from "~/utils/api";
import { Layout } from "~/components/layout";

const documentDescriptions: Record<
  "PHOTO" | "AADHAR_CARD" | "MARKSHEET" | "FEE_PROOF" | "COLLEGE_ID",
  string
> = {
  PHOTO: "Upload a clear photo of yourself.",
  AADHAR_CARD:
    "Upload your Aadhar card. If you are not an Indian citizen, upload your passport.",
  MARKSHEET: "Upload your mark sheet of the previous semester.",
  FEE_PROOF: "Upload fee proof for this year.",
  COLLEGE_ID: "Upload your college ID.",
};

const TeamMemberVerificationPage = () => {
  const router = useRouter();
  const { token, teamMemberId } = router.query;
  const toast = useToast();

  const [teamMember, setTeamMember] = useState<{
    name: string;
    documents: {
      documentType:
        | "PHOTO"
        | "AADHAR_CARD"
        | "MARKSHEET"
        | "FEE_PROOF"
        | "COLLEGE_ID";
      description: string;
      fileUrl: string | null;
      originalFileName: string | null;
      uploadStatus: string;
    }[];
  } | null>(null);

  const {
    data: fetchedTeamMember,
    isLoading,
    isError,
  } = api.reg.getTeamMemberById.useQuery(
    { teamMemberId: teamMemberId as string },
    {
      enabled: !!teamMemberId, // only run query if teamMemberId is present
    }
  );

  const uploadDocumentMutation = api.reg.uploadDocument.useMutation();
  const updateDocumentStatusMutation =
    api.reg.updateDocumentStatus.useMutation();

  useEffect(() => {
    if (fetchedTeamMember) {
      setTeamMember({
        name: fetchedTeamMember.name,
        documents: fetchedTeamMember.documents.map((doc) => ({
          documentType: doc.documentType,
          description: documentDescriptions[doc.documentType],
          fileUrl: doc.fileUrl,
          originalFileName: doc.originalFileName,
          uploadStatus: doc.uploadStatus || "NOT_UPLOADED",
        })),
      });
    }
  }, [fetchedTeamMember]);

  const handleUpload = async (
    documentType:
      | "PHOTO"
      | "AADHAR_CARD"
      | "MARKSHEET"
      | "FEE_PROOF"
      | "COLLEGE_ID"
  ) => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        try {
          // Perform the mutation for uploading the document
          const { signedUrl, document } = await new Promise<{
            signedUrl: string;
            document: {
              id: string;
              fileUrl: string;
              uploadStatus: string;
            };
          }>((resolve, reject) => {
            uploadDocumentMutation.mutate(
              {
                memberId: teamMemberId as string,
                fileName: file.name,
                fileType: file.type,
                documentType, // Added documentType here
              },
              {
                onSuccess: (data) => resolve(data),
                onError: (error) => reject(error),
              }
            );
          });

          // Perform the actual file upload to R2
          await fetch(signedUrl, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            },
          });

          // Update the document status to "UPLOADED"
          await new Promise<{
            id: string;
            fileUrl: string;
            uploadStatus: string;
          }>((resolve, reject) => {
            updateDocumentStatusMutation.mutate(
              {
                documentId: document.id,
                status: "UPLOADED",
              },
              {
                onSuccess: (data) => resolve(data),
                onError: (error) => reject(error),
              }
            );
          });

          toast({
            title: "Upload Successful",
            description: "Your document has been uploaded.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          // Optionally, update the team member's document status in the UI
          setTeamMember((prevTeamMember) => ({
            ...prevTeamMember!,
            documents: prevTeamMember!.documents.map((doc) =>
              doc.documentType === documentType
                ? {
                    ...doc,
                    fileUrl: document.fileUrl,
                    uploadStatus: "UPLOADED",
                  }
                : doc
            ),
          }));
        } catch (error) {
          toast({
            title: "Upload Failed",
            description: "There was an error uploading your document.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    };
    input.click();
  };

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

  if (isError || !teamMember) {
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
          {teamMember.name}
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {teamMember.documents.map((doc) => (
            <Box
              key={doc.documentType}
              bg="#220202"
              border="1px solid #F4AC18"
              borderRadius="lg"
              p={4}
            >
              <VStack spacing={4} align="start">
                <Heading as="h3" size="md" color="white">
                  {doc.documentType.replace("_", " ").toUpperCase()}
                </Heading>
                <Text fontSize="sm" color="gray.300">
                  {doc.description}
                </Text>
                <Button
                  colorScheme="yellow"
                  variant="solid"
                  onClick={() => handleUpload(doc.documentType)}
                  leftIcon={<FaFileUpload />}
                >
                  Upload {doc.documentType.replace("_", " ").toLowerCase()}
                </Button>
                {doc.uploadStatus === "UPLOADED" && doc.fileUrl && (
                  <Link href={doc.fileUrl} isExternal color="yellow.400">
                    View Uploaded{" "}
                    {doc.documentType.replace("_", " ").toLowerCase()}
                  </Link>
                )}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        <Button
          mt={8}
          colorScheme="yellow"
          size="lg"
          onClick={() => router.push(`/verify/${token as string}`)}
        >
          Save and Go Back
        </Button>
      </Box>
    </Layout>
  );
};

export default TeamMemberVerificationPage;
