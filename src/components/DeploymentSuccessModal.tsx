import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import { useClipboard } from "@chakra-ui/react";

interface DeploymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  txid: string | undefined; 
  contractAddress: string | undefined; 
}

const DeploymentSuccessModal: React.FC<DeploymentSuccessModalProps> = ({ isOpen, onClose, txid, contractAddress }) => {
  const { hasCopied: txidCopied, onCopy: onCopyTxid } = useClipboard(txid);
  const { hasCopied: contractAddressCopied, onCopy: onCopyContractAddress } = useClipboard(contractAddress);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Deployment Success</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={2}>Transaction ID (txid): {txid}</Text>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={onCopyTxid}
            disabled={txidCopied}
          >
            {txidCopied ? "Copied" : "Copy Txid"}
          </Button>

          <Text mb={2}>Contract Address: {contractAddress}</Text>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={onCopyContractAddress}
            disabled={contractAddressCopied}
          >
            {contractAddressCopied ? "Copied" : "Copy Contract Address"}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeploymentSuccessModal;
