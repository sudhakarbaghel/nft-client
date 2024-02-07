import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import ResponsiveCard from "../../components/TokenCard";
import { getAllTokens } from "../../network/lib/token";
import { useAccount } from "wagmi";
import Link from "next/link";

const Tokens = () => {
  const router = useRouter();
  const { address } = useAccount();

  const { data: tokens, isLoading, isError } = useQuery(
    ["getAllTokens", address],
    () => getAllTokens(address, ""),
    {
      enabled: !!address,
    }
  );

  useEffect(() => {
    // Additional logic if needed
  }, [tokens]);

  if (isLoading) {
    return <Spinner size="lg" />;
  }

  if (isError) {
    return <p>Error fetching data</p>;
  }

  return (
    <Box>
      <Heading mb={4} textAlign="center">
        My NFTs
      </Heading>

      <Flex justifyContent="space-between" flexWrap="wrap">
        {tokens &&
          tokens.data.map((token) => (
            <Link
              key={token.tokenId}
              href={`/tokens/${encodeURIComponent(
                token.tokenId
              )}?collectionAddress=${encodeURIComponent(address)}`}
            >
              <a>
                <ResponsiveCard
                  src={token.imageUri}
                  tokenId={token.tokenId}
                />
              </a>
            </Link>
          ))}
      </Flex>
    </Box>
  );
};

export default Tokens;
