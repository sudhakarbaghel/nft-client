import { Box, Image, Text, Flex } from "@chakra-ui/react";
import React from "react";

const TokenCard = ({ src, tokenId,price }: { src: string; tokenId: string ,price:string}) => {
  return (
    <Box
      maxW={{ base: "100%", md: "400px" }}
      width={{ base: "100%", md: "300px" }} 
      height="300px" 
      overflow="hidden"
      borderRadius="md"
      bg="white"
      position="relative"
      transition="box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out" 
      _hover={{
        boxShadow: "lg", 
      }}
    >
      <Image
        src={src}
        alt="Card Image"
        width="100%"
        height="100%"  
        objectFit="cover"  
      />

      <Flex
        direction="column"
        align="start"
        justify="flex-end"
        position="absolute"
        bottom="0"
        left="0"
        w="100%"
        h="100%"  
        bg="rgba(0, 0, 0, 0.4)"
        color="white"
        p="4"
        boxSizing="border-box"
        borderBottomRadius="md"
        transition="background-color 0.3s ease-in-out"  
        _hover={{
          bg: "rgba(0, 0, 0, 0.6)",  
        }}
      >
        <Text fontSize="sm">Token ID: {tokenId}</Text>
      </Flex>
    </Box>
  );
};

export default TokenCard;
