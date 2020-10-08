Link; // import Head from 'next/head'

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
import Wish from "../components/Wish";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const [wishes, setWishes] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getWishes = async () => {
    setLoading(true);
    const res = await axios.get("/api/wishes?page=1");
    setWishes(res.data);
    setLoading(false);
  };
  
  const getWishesNext = async () => {
    const res = await axios.get(`/api/wishes?page=${page+1}`);
    console.log(res)
    if(res.data.length > 0){
      setPage(page+1)
      setWishes([...wishes, ...res.data]);
    } else {
      setHasMore(false)
    }
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
            <InfiniteScroll
              dataLength={wishes.length}
              next={() => getWishesNext()}
              hasMore={hasMore}
              loader={<Spinner />}
              endMessage={
                <Text textAlign="center" mt={3}>
                  O estoque de desejos acabou :3
                </Text>
              }
            >
              {wishes.map((wish) => (
                <Wish wish={wish} key={wish._id} />
              ))}
            </InfiniteScroll>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
