import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  RadioGroup,
  HStack,
  Radio,
  Textarea,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { Pet } from '../context/pets';

const AddPetModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pet, setPet] = useState<Partial<Pet>>({ type: 'dog', tags: [], gender: 'male' });
  const initialRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <Button size="sm" onClick={onOpen} rightIcon={<FaPlus />}>הוסף</Button>

      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>הוסף חיה</ModalHeader>
          <ModalCloseButton left={3} right="unset" />
          <ModalBody>
            <form>
              <FormControl as="fieldset">
                <FormLabel as="legend">סוג</FormLabel>
                <RadioGroup value={pet.type} onChange={(value) => setPet({ ...pet, type: value })}>
                  <HStack spacing="24px">
                    <Radio value="dog">כלב</Radio>
                    <Radio value="cat">חתול</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <FormControl id="name">
                <FormLabel>שם</FormLabel>
                <Input type="text" value={pet.name} ref={initialRef} onChange={(e) => setPet({ ...pet, name: e.target.value })} />
              </FormControl>
              <FormControl as="fieldset">
                <FormLabel as="legend">מין</FormLabel>
                <RadioGroup value={pet.gender} onChange={(value) => setPet({ ...pet, gender: value })}>
                  <HStack spacing="24px">
                    <Radio value="male">זכר</Radio>
                    <Radio value="female">נקבה</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <FormControl id="age">
                <FormLabel>גיל</FormLabel>
                <NumberInput value={pet.age} onChange={(_, v) => setPet({ ...pet, age: v })} step={0.5}>
                  <NumberInputField />
                  <NumberInputStepper left={0} right="unset">
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl id="description">
                <FormLabel>תיאור</FormLabel>
                <Textarea type="text" value={pet.description} onChange={(e) => setPet({ ...pet, description: e.target.value })} />
                <FormHelperText>תיאור ופרטים נוספים על החיה.</FormHelperText>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost">ביטול</Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              שמור
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPetModal;
