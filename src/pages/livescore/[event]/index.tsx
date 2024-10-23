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
import { api } from "~/utils/api";

const LiveScore = () => {
  const router = useRouter();
  const toast = useToast();
  const { event } = router.query;

  return (
    <Box>
      <Flex justifyContent="center" alignItems="center" height="30vh">
        <Text fontSize="3xl">{event}</Text>
        
      </Flex>
    </Box>
  )

};

export default LiveScore;
