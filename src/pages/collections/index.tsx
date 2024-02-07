import React, { useEffect, useState } from "react";
import { Container, SimpleGrid, Select, Stack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import CollectionCard from "../../components/CollectionCard";
import { getAllContracts } from "../../network/lib/contract";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const ContractsPage = () => {
  const router = useRouter();
  const { query } = router;
  const { address, isConnecting, isDisconnected } = useAccount();
  const [selectedOption, setSelectedOption] = useState(query.owner == "true" ? "my" : "all");
  console.log("🚀 ~ ContractsPage ~ selectedOption:", selectedOption)
  
  console.log("🚀 ~ ContractsPage ~ query.owner:", query.owner)

  const { data: contracts, isLoading, isError } = useQuery("contracts", getAllContracts);
useEffect(()=>{
  if(query.owner == "true" ){
    setSelectedOption( "my")
  }
},[query])
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching contracts</p>;
  }

  const filteredContracts =
    selectedOption === "all"
      ? contracts?.data
      : contracts?.data?.filter((contract) => (selectedOption === "my" ? contract.owner === address : true));

  return (
    <Container maxW="container.lg" mt={8}>
      <Stack direction="row" mb={4} ml={4} spacing={4}>
        <Select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          colorScheme="teal"
          isDisabled={isConnecting || isDisconnected}
          width={210}
        >
          <option value="all">Show All Collections</option>
          <option value="my">Show My Collections</option>
        </Select>
      </Stack>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8}>
        {filteredContracts?.map((contract, index) => (
          <CollectionCard key={index} {...contract} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ContractsPage;
