import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useAccount, useContractWrite } from "wagmi";
import { abi } from "../constants/contractData";
import ErrorAndSuccessModal from "./ErrorAndSuccesModal";
import { addToken } from "../network/lib/token";
import { ethers } from "ethers";

const MintForm = ({ contractAddress }) => {
  const { address } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    imageUri: "",
    accountAddress: address,
    tokenId: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({
    imageUri: false,
    accountAddress: false,
    tokenId: false,
    description: false,
  });

  const { isLoading, isSuccess, isError, error, write } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "mint",
    args: [formData?.accountAddress, formData?.imageUri, formData?.tokenId],
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: false }));
  };

  useEffect(() => {
    if (isSuccess || isError) {
      onOpen();
    }
    if (isSuccess) {
      (async () => {
        try {
          const addContractRes = await addToken({
            user: address,
            tokenInfo: { ...formData, contractAddress, sell: false, price: 0 },
          });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [isSuccess, isError, onOpen, address, formData, contractAddress]);

  // Define the success and error messages
  const successMessage = "Your NFT has been successfully minted.";
  const errorMessage =
    "There was an error while minting the NFT. Please try again or check the console for more details.";

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Box m={4} minW={320} p={6} boxShadow="lg" borderRadius="md">
      <form>
        <FormControl isRequired mb={4} isInvalid={formErrors.imageUri}>
          <FormLabel>Image URI</FormLabel>
          <Input
            placeholder="Enter image URI"
            value={formData.imageUri}
            onChange={(e) => handleInputChange("imageUri", e.target.value)}
          />
          <FormErrorMessage>Image URI is required</FormErrorMessage>
        </FormControl>

        <FormControl isRequired mb={4} isInvalid={formErrors.accountAddress}>
          <FormLabel>Account Address</FormLabel>
          <Input
            placeholder="Enter account address"
            value={formData.accountAddress}
            onChange={(e) =>
              handleInputChange("accountAddress", e.target.value)
            }
          />
          <FormErrorMessage>Account address is required</FormErrorMessage>
        </FormControl>

        <FormControl isRequired mb={4} isInvalid={formErrors.tokenId}>
          <FormLabel>Token ID</FormLabel>
          <Input
            placeholder="Enter Token ID"
            value={formData.tokenId}
            onChange={(e) => handleInputChange("tokenId", e.target.value)}
          />
          <FormErrorMessage>Token ID is required</FormErrorMessage>
        </FormControl>

        <FormControl isRequired mb={4} isInvalid={formErrors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          <FormErrorMessage>Description is required</FormErrorMessage>
        </FormControl>

        <Button
          onClick={() => write()}
          colorScheme="teal"
          isLoading={isLoading}
          loadingText="Minting..."
        >
          Mint NFT
        </Button>
      </form>

      <ErrorAndSuccessModal
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
        isSuccess={isSuccess}
        error={error}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      </Box>
  );
};

export default MintForm;
