// pages/index.tsx
import React, { useEffect } from "react";
import { NextPage } from "next";
import { useQuery } from "react-query";
import { getAllContracts } from "../network/lib/contract";
import { getAllTokens } from "../network/lib/token";
import CollectionCard from "../components/CollectionCard";
import Link from "next/link";
import TokenCard from "../components/TokenCard";
import { Flex, Box, Heading, Container } from "@chakra-ui/react"; 

const Home: NextPage = () => {
  const {
    data: contracts,
    isLoading: contractsLoading,
    isError: contractsError,
    refetch: refetchContracts,
  } = useQuery("getAllContracts", getAllContracts);

  const {
    data: tokens,
    isLoading: tokensLoading,
    isError: tokensError,
    refetch: refetchTokens,
  } = useQuery("getAllTokens", () => getAllTokens('', ''), {
    staleTime: 600000,
  });

  useEffect(() => {
    // Additional logic if needed
  }, [contracts, tokens]);

  if (contractsLoading || tokensLoading) {
    return <p>Loading...</p>;
  }

  if (contractsError || tokensError) {
    return <p>Error fetching data</p>;
  }

  return (
    <Container maxW="container.lg" mt={8}>
       
        <Box mb={8}>
          <Heading as="h2" size="lg" mb={4}>
            Collections
          </Heading>
          <Flex wrap="wrap" gap={4}>
            {contracts?.data.map((contract) => (
              <Box key={contract.address}>
                <Link href={`/collections/${encodeURIComponent(contract.contractAddress)}`}>
                  <a>
                    <CollectionCard {...contract} />
                  </a>
                </Link>
              </Box>
            ))}
          </Flex>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            NFTs
          </Heading>
          <Flex wrap="wrap" gap={4}>
            {tokens?.data.slice(0, 5).map((token) => (
              <Box key={token.tokenId}>
                <Link href={`/tokens/${token.tokenId}/?collectionAddress=${encodeURIComponent(token.contractAddress)}`}>
                  <a>
                    <TokenCard src={token.imageUri} tokenId={token.tokenId} price={token.price} />
                  </a>
                </Link>
              </Box>
            ))}
          </Flex>
        </Box>
    </Container>
  );
};

export default Home;
