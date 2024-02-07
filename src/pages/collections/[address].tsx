import React, { useState } from "react";
import { Container, Flex, SimpleGrid, Box, Select } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import CollectionCard from "../../components/CollectionCard";
import MintForm from "../../components/MintForm";
import ResponsiveCard from "../../components/TokenCard";
import {
  getAllContracts,
  getContractByAddress,
} from "../../network/lib/contract";
import { getAllTokens } from "../../network/lib/token";
import Link from "next/link";
import { useAccount } from "wagmi";

const ContractsPage = () => {
  const { address: account } = useAccount();
  const router = useRouter();
  const { address } = router.query;
  const [filterByAccount, setFilterByAccount] = useState(false);

  const {
    data: contractDetails,
    isLoading: contractLoading,
    isError: contractError,
  } = useQuery(
    ["getContractByAddress", address],
    () => getContractByAddress(address),
    {
      enabled: !!address,
    }
  );

  const {
    data: nfts,
    isLoading: nftsLoading,
    isError: nftsError,
  } = useQuery(["getAllTokens", address], () => getAllTokens('',address), {
    enabled: !!address,
  });

  if (contractLoading || nftsLoading) {
    return <p>Loading...</p>;
  }

  if (contractError || nftsError) {
    return <p>Error fetching data</p>;
  }

  const filteredNFTs = filterByAccount
    ? nfts?.data?.filter((nft) => nft.owner === account)
    : nfts?.data;

  return (
    <Container maxW="1024" mt={8}>
      <Flex justifyContent="space-between" align="stretch" mb={8}>
        <Box flexBasis="48%">
          <CollectionCard {...contractDetails?.data} />
        </Box>
        <Box flexBasis="48%">
          <MintForm contractAddress={address} />
        </Box>
      </Flex>

      <Flex mb={4} alignItems="center">
        <Box flexBasis="48%">
          <Select
            onChange={(e) => setFilterByAccount(e.target.value === "true")}
          >
            <option value="false">Show All</option>
            <option value="true">My NFTs</option>
          </Select>
        </Box>
      </Flex>

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8}>
        {filteredNFTs?.map((nft) => (
          <Link
            key={nft.tokenId}
            href={`/tokens/${encodeURIComponent(
              nft.tokenId
            )}?collectionAddress=${encodeURIComponent(address)}`}
          >
            <a>
              <ResponsiveCard src={nft.imageUri} tokenId={nft.tokenId} />
            </a>
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ContractsPage;
