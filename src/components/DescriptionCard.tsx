import React from "react";
import { Box, Text, Heading, Flex, Spinner } from "@chakra-ui/react";

interface DescriptionCardProps {
  description: string;
  usdPrice: number;
  priceLoading: boolean;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({
  description,
  usdPrice,
  priceLoading,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      mb={4}
      boxShadow="md"
      transition="0.3s"
      _hover={{
        boxShadow: "lg",
      }}
      flex="1"
    >
      <Heading as="h3" fontSize="lg" mb={2}>
        Description
      </Heading>
      <Text fontSize="md" color="gray.600">
        {description}
      </Text>
      <Flex justify="space-between" mt={4}>
        <Text fontSize="lg" fontWeight="bold">
          USD Price:
        </Text>
        <Text fontSize="lg">
          {priceLoading ? (
            <Spinner size="xs" />
          ) : usdPrice != 0 ? (
            `$${usdPrice}`
          ) : (
            "Not for sale!"
          )}
        </Text>
      </Flex>
    </Box>
  );
};

export default DescriptionCard;
