import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { useAccount, useContractWrite } from "wagmi";
import { abi } from "../constants/contractData";
import { useMutation } from "react-query";
import { updateToken } from "../network/lib/token";
import { useEffect } from "react";
import ErrorAndSuccessModal from "./ErrorAndSuccesModal";


interface BuyButtonProps {
  contractAddress: string;
  tokenId: string;
  price: bigint;
}

const BuyButton: React.FC<BuyButtonProps> = ({
  contractAddress,
  tokenId,
  price,
}: BuyButtonProps) => {
  const { address } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook for modal state
  const { isLoading, isError, error, write, isSuccess } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "purchase",
    args: [tokenId],
    value: price,
  });
  const updateTokenMutation = useMutation(updateToken);

  useEffect(() => {
    if (isSuccess) {
      onOpen();  
      updateTokenMutation.mutate({
        tokenId,
        owner: address,
      });
    }if(isError){
      onOpen()
    }
  }, [isSuccess, isError]);

  const handleBuy = async () => {
    try {
      if (price !== 0) write();
    } catch (error) {
      console.error("Error buying token", error);
    }
  };

 

  return (
    <Box mt={4}>
      <Button
        colorScheme="blue"
        onClick={handleBuy}
        isLoading={isLoading}
        variant={price === 0 ? "outline" : "solid"}
        borderColor={price === 0 ? "red.500" : "blue.500"}
      >
        {price === 0 ? "Not listed For buying!" : "Buy"}
      </Button>

      {isError && (
        <p style={{ color: "red", marginTop: "8px" }}>
          {error?.message || "An error occurred while buying the token."}
        </p>
      )}

      <ErrorAndSuccessModal
        isOpen={isOpen}
        handleCloseModal={onClose}
        isSuccess={isSuccess}
        error={error}
        successMessage="Purchase Successful!"
        errorMessage="Error purchasing the token."
      />
    </Box>
  );
};

export default BuyButton;
