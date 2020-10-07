// import Head from 'next/head'

import {
  Flex,
  Link,
  Button,
  Text,
  Image,
  Icon,
  Box,
  Spinner,
} from "@chakra-ui/core";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [wishes, setWishes] = useState([]);

  const [loading, setLoading] = useState(false);

  const getWishes = async () => {
    setLoading(true)
    const res = await axios.get("/api/wishes");
    setWishes(res.data);
    setLoading(false)
  };

  useEffect(() => {
    getWishes();
  }, []);

  return (
    <Flex as="main" justifyContent="center" alignItems="center">
      <Flex
        backgroundColor="gray.700"
        borderRadius="md"
        flexDir="column"
        alignItems="stretch"
        padding={8}
        marginTop={4}
        width="100%"
        maxW="600px"
      >
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Text
            textAlign="center"
            fontSize="2xl"
            color="gray.50"
            fontWeight="bold"
          >
            <Icon name="star" size="22px" /> whisher
          </Text>
          <Link href="/wish" _hover={{ textDecoration: "none" }}>
            <Button
              backgroundColor="purple.500"
              height="50px"
              borderRadius="sm"
              _hover={{ backgroundColor: "purple.600" }}
            >
              DESEJAR
            </Button>
          </Link>
        </Flex>

        <Text
          textAlign="center"
          fontSize="sm"
          color="gray.400"
          marginBottom={2}
        >
          Últimos desejos realizados
        </Text>

        {loading ? (
          <Flex alignItems="center" justifyContent="center" my={5}>
            <Spinner />
          </Flex>
        ) : (
          <Flex flexDir="column">
            {wishes.map((wish) => (
              <Box bg="gray.600" w="100%" p={4} my={2} borderRadius="md">
                <Box fontSize="sm" mb={3}>
                  <Text color="gray.50" fontWeight="bold">
                    {wish.name}
                  </Text>
                  <Link
                    href={`https://instagram.com/${wish.instagram}`}
                    isExternal
                  >
                    @{wish.instagram}
                  </Link>
                </Box>
                <Text>{wish.message}</Text>
              </Box>
            ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
