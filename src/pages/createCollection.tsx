import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Heading,
  Button,
  Input,
  Spinner,
  FormControl,
  FormLabel,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";
import { deployContract } from "../network/lib/nft";
import { useAccount, useWalletClient } from "wagmi";
import { addContract } from "../network/lib/contract";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client as config } from "../configuration/Web3";
import DeploymentSuccessModal from "../components/DeploymentSuccessModal";

const DeployContract = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [formState, setFormState] = useState({
    name: "",
    symbol: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: false,
    symbol: false,
    description: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [txid, setTxid] = useState<string | undefined>("");
  const [contractAddress, setContractAddress] = useState<string | undefined>(
    ""
  );

  const { data: walletClient } = useWalletClient();

  const handleInputChange = (field: any, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleDeploy = async () => {
    const { name, symbol, description } = formState;

    if (!isConnecting && !isDisconnected && name && symbol && description) {
      setIsLoading(true);
      try {
        const { success, contractAddress, txid, error } = await deployContract(
          name,
          symbol,
          walletClient
        );
        if (success) {
          const addContractRes = await addContract({
            user: address,
            contractInfo: { ...formState, contractAddress },
          });
          setTxid(txid);
          setContractAddress(contractAddress);
          setShowModal(true);
          toast.success("Success Notification!");
        } else {
          console.error("Contract deployment failed:", error);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setFormErrors({
        name: !name,
        symbol: !symbol,
        description: !description,
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTxid("");
    setContractAddress("");
  };

  return (
    <Container maxW="container.md" mt={8}>
      <Box p={6} boxShadow="lg" borderRadius="md">
        <Heading mb={4}>Deploy ERC-721 Contract</Heading>

        <FormControl mb={4} isRequired isInvalid={formErrors.name}>
          <FormLabel>Contract Name</FormLabel>
          <Input
            placeholder="Contract Name"
            value={formState.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          {formErrors.name && (
            <FormHelperText color="red">
              Contract Name is required
            </FormHelperText>
          )}
        </FormControl>
        <FormControl mb={4} isRequired isInvalid={formErrors.symbol}>
          <FormLabel>Contract Symbol</FormLabel>
          <Input
            placeholder="Contract Symbol"
            value={formState.symbol}
            onChange={(e) => handleInputChange("symbol", e.target.value)}
          />
          {formErrors.symbol && (
            <FormHelperText color="red">
              Contract Symbol is required
            </FormHelperText>
          )}
        </FormControl>
        <FormControl mb={4} isRequired isInvalid={formErrors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Description"
            value={formState.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          {formErrors.description && (
            <FormHelperText color="red">Description is required</FormHelperText>
          )}
        </FormControl>
        <Button
          onClick={handleDeploy}
          colorScheme="teal"
          isDisabled={isConnecting || isDisconnected || isLoading}
        >
          {isLoading ? "Deploying" : "Deploy ERC-721 Contract"}
          {isLoading && <Spinner ml={2} size="sm" />}
        </Button>

        <DeploymentSuccessModal
          isOpen={showModal}
          onClose={closeModal}
          txid={txid}
          contractAddress={contractAddress}
        />
      </Box>
    </Container>
  );
};

export default DeployContract;
