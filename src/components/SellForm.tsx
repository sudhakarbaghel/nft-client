import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  useDisclosure,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";

import { useAccount, useContractWrite } from "wagmi";
import { abi } from "../constants/contractData";
import { useMutation } from "react-query";
import { updateToken } from "../network/lib/token";
import { utils } from "ethers";
import ErrorAndSuccessModal from "./ErrorAndSuccesModal";

const SellForm = ({ tokenId, contractAddress, sell }) => {
  const { address: account } = useAccount();
  const [price, setPrice] = useState(utils.formatEther(sell));
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, isSuccess, isError, error, write } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "setPrice",
    args: [tokenId, utils.parseEther(price || "0")],
  });

  const updateTokenMutation = useMutation(updateToken);

  useEffect(() => {
    if (isSuccess) {
      onOpen();
      updateTokenMutation.mutate({
        price: utils.parseEther(price || "0").toString(),
        sell: true,
        tokenId,
        owner: account,
      });
    } else if (isError) {
      onOpen();
    }
  }, [isSuccess, isError]);

  const handleSell = async () => {
    try {
      write();
    } catch (error) {
      console.error("Error selling token", error);
      onOpen();
    }
  };

 

  return (
    <Box mt={4}>
      <FormControl>
        <FormLabel>
          {sell
            ? "Adjust your price based on market conditions"
            : "Sell your NFT"}
        </FormLabel>
        <InputGroup width={400}>
          <Input
            type="number"
            isRequired
            placeholder="Enter price in ETH"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm">
              ETH
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        mt={4}
        colorScheme="teal"
        onClick={handleSell}
        isLoading={isLoading}
      >
        {sell ? "Update Price" : "List for sale"}
      </Button>

      <ErrorAndSuccessModal
        isOpen={isOpen}
        handleCloseModal={onClose}
        isSuccess={isSuccess}
        error={error}
        successMessage="Your NFT has been successfully listed for sale."
        errorMessage={error?.message || "An error occurred while selling the token."}
      />
    </Box>
  );
};

export default SellForm;
