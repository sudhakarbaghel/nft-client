import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAccount, useContractRead } from "wagmi";
import { useQuery } from "react-query";
import TokenCard from "../../components/TokenCard";
import SellForm from "../../components/SellForm";
import BuyButton from "../../components/BuyButton";
import { getToken } from "../../network/lib/token";
import { abi } from "../../constants/contractData";
import { usePriceContext } from "../../contexts/priceContext";
import { convertWeiToUSD } from "../../contexts/priceContext";
import DescriptionCard from "../../components/DescriptionCard";
import { Flex, Spacer } from "@chakra-ui/react";
const Token = () => {
  const { rate,loading} = usePriceContext();
  const { address } = useAccount();

  const router = useRouter();

  const { tokenId, collectionAddress } = router.query;
  console.log("🚀 ~ Token ~ tokenId:", tokenId)
  console.log("🚀 ~ Token ~ collectionAddress:", collectionAddress)
console.log(tokenId)
  const {
    data: tokenInfo,
    isLoading,
    isError,
  } = useQuery(["getToken", tokenId], () => getToken(tokenId), {
    enabled: !!tokenId,
  });
     

  const { data } = useContractRead({
    abi,
    address: collectionAddress,
    functionName: "ownerOf",
    args: [tokenId],
  });
  console.log("🚀 ~ Token ~ data:", data)

  const { data: priceInWei } = useContractRead({
    abi,
    address: collectionAddress,
    functionName: "_price",
    args: [tokenId],
  });

  const isOwner = tokenInfo && data === address;
  console.log("🚀 ~ Token ~ isOwner:", isOwner)
  
  console.log(priceInWei,"priceInwei")
  const tokenPriceInUsd = convertWeiToUSD(priceInWei, rate);
  console.log(tokenPriceInUsd);
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching token information</p>
      ) : (
        <>
          <Flex>
            <TokenCard
              src={tokenInfo?.data.imageUri}
              tokenId={tokenInfo?.data?.tokenId}
              price={tokenPriceInUsd}
            />
            <Spacer />
            <DescriptionCard
            priceLoading={loading}
              description={tokenInfo?.data.description}
              usdPrice={tokenPriceInUsd}
            />
          </Flex>

          {isOwner ? (
            <SellForm
              tokenId={tokenId}
              sell={priceInWei}
              contractAddress={tokenInfo?.data?.contractAddress}
            />
          ) : (
            <BuyButton
              tokenId={tokenId}
              price={tokenInfo?.data?.price}
              contractAddress={tokenInfo?.data?.contractAddress}
            />
          )}
        </>
      )}
    </>
  );
};

export default Token;
