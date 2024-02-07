import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  handleCloseModal: () => void;
  isSuccess: boolean;
  successMessage: string;
  errorMessage: string;
  error: Error | null;
};

export default function ErrorAndSuccessModal({
  isOpen,
  handleCloseModal,
  isSuccess,
  successMessage,
  errorMessage,
  error,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isSuccess ? "Operation Successful" : "Operation Failed"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isSuccess ? (
            <p>{successMessage}</p>
          ) : (
            <p>
              {errorMessage}
              <br />
              {error && <span>Error: {error.message}</span>}
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={isSuccess ? "teal" : "red"}
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
