import React from "react";
import {
  Box,
  Button,
  Flex,
  Link,
  Text,
} from "@chakra-ui/core";

const Wish: React.FC<{wish}> = ({ wish }) => {
  return (
        <Box bg="gray.600" w="100%" p={4} my={2} borderRadius="md">
          <Box fontSize="sm" mb={3}>
            <Text color="gray.50" fontWeight="bold">
              {wish.name}
            </Text>
            <Link href={`https://instagram.com/${wish.instagram}`} isExternal>
              @{wish.instagram}
            </Link>
          </Box>
          <Text overflow="hidden">{wish.message}</Text>
          {!!wish.email && (
            <Box display="flex" justifyContent="center" mt={2}>
              <Link
                href={`https://www.paypal.com/donate/?cmd=_donations&business=${wish.email}&currency_code=BRL`}
                width="100%"
                isExternal
              >
                <Button
                  height="40px"
                  borderRadius="sm"
                  width="100%"
                  _hover={{ backgroundColor: "purple.600" }}
                >
                  DOAR
                </Button>
              </Link>
            </Box>
          )}
        </Box>
  );
};

export default Wish;
