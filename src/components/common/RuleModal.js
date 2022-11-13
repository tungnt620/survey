import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Rule from "./Rule.jsx";

const RuleModal = ({ isOpen, onClose, stateMachine }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <Rule stateMachine={stateMachine} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RuleModal;
