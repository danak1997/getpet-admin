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
  Checkbox,
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
  CheckboxGroup,
  List,
  ListItem,
  Select,
} from '@chakra-ui/react';
import { FaPen, FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { Pet, usePets } from '../context/pets';
import axios from 'axios';
import { getAuthHeaders } from '../utils/auth';
import { tags, tagsData } from '../utils/tags';
import { toBase64 } from '../utils/file';
import { useEffect } from 'react';
import locations from '../locations';

type Props = {
  pet?: Pet;
}

const AddPetModal = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pet, setPet] = useState<Partial<Pet>>({ type: 'dog', tags: [], gender: 'male' });
  const initialRef = React.useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const { reloadPets } = usePets();
  const saveMode = !props.pet;

  useEffect(() => {
    props.pet && setPet(props.pet);
  }, [props.pet]);

  const close = () => {
    saveMode && setPet({ type: 'dog', tags: [], gender: 'male' });
    onClose();
  };

  const addPet = async () => {
    try {
      if (!pet.name || !pet.description || !pet.profilePhoto) return;
      setLoading(true);
      const url = saveMode ? '/api/pets' : `/api/pets/${pet.id}`;
      const method = saveMode ? 'post' : 'put';

      await axios[method](url, {
        name: pet.name,
        description: pet.description,
        type: pet.type,
        age: pet.age,
        gender: pet.gender,
        profilePhoto: pet.profilePhoto,
        tags: pet.tags
      }, getAuthHeaders());
      reloadPets();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const tagChanged = (tag: string, checked: boolean) => {
    if (!pet?.tags) pet.tags = [];

    if (checked) {
      setPet({ ...pet, tags: [...pet?.tags, tag] });
    } else {
      setPet({ ...pet, tags: pet.tags.filter((petTag) => petTag !== tag) });
    }
  };

  return (
    <>
      <Button size="sm" onClick={onOpen} rightIcon={saveMode ? <FaPlus /> : <FaPen />}>{saveMode ? 'הוסף' : 'ערוך'}</Button>

      <Modal isOpen={isOpen} onClose={close} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{saveMode ? 'הוסף חיה' : 'ערוך פרטי חיה'}</ModalHeader>
          <ModalCloseButton left={3} right="unset" />
          <ModalBody>
            <form>
              <FormControl as="fieldset">
                <FormLabel as="legend">סוג</FormLabel>
                <RadioGroup value={pet.type} onChange={(value) => setPet({ ...pet, type: value })}>
                  <HStack spacing="24px">
                    <Radio value="dog" disabled={loading}>כלב</Radio>
                    <Radio value="cat" disabled={loading}>חתול</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <FormControl id="name">
                <FormLabel>שם</FormLabel>
                <Input type="text" disabled={loading} value={pet.name} ref={initialRef} onChange={(e) => setPet({ ...pet, name: e.target.value })} />
              </FormControl>
              <FormControl as="fieldset">
                <FormLabel as="legend">מין</FormLabel>
                <RadioGroup value={pet.gender} onChange={(value) => setPet({ ...pet, gender: value })}>
                  <HStack spacing="24px">
                    <Radio value="male" disabled={loading}>זכר</Radio>
                    <Radio value="female" disabled={loading}>נקבה</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <FormControl id="age">
                <FormLabel>גיל</FormLabel>
                <NumberInput disabled={loading} value={pet.age} onChange={(_, v) => setPet({ ...pet, age: v || 0 })} step={0.5}>
                  <NumberInputField />
                  <NumberInputStepper left={0} right="unset">
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl id="description">
                <FormLabel>תגיות</FormLabel>
                <CheckboxGroup colorScheme="green">
                  <List flexDirection="column" spacing={2}>
                    {Object.keys(tags).map((tag) => (
                      <ListItem key={tag}>
                        <Checkbox disabled={loading} colorScheme="blue" defaultChecked={pet?.tags?.includes(tag)} onChange={(e) => tagChanged(tag, e.target.checked)}>
                          {tagsData[tag].text}
                        </Checkbox>
                      </ListItem>
                    ))}
                  </List>
                </CheckboxGroup>
              </FormControl>
              <FormControl id="location">
                <FormLabel>מיקום</FormLabel>
                <Select dir="ltr" value={pet.location}>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="description">
                <FormLabel>תיאור</FormLabel>
                <Textarea disabled={loading} type="text" value={pet.description} onChange={(e) => setPet({ ...pet, description: e.target.value })} />
                <FormHelperText>תיאור ופרטים נוספים על החיה.</FormHelperText>
              </FormControl>
              <FormControl id="photo">
                <FormLabel>תמונה</FormLabel>
                <label>
                  <Input style={{ display: pet.profilePhoto ? 'none' : '' }} type="file" disabled={loading} accept="image/png, image/gif, image/jpeg" onChange={async (e) => e.target.files && setPet({ ...pet, profilePhoto: await toBase64(e.target.files[0]) })} />
                  {pet.profilePhoto && <img src={pet.profilePhoto} style={{ cursor: 'pointer' }} />}
                </label>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={close}>ביטול</Button>
            <Button colorScheme="blue" mr={3} isLoading={loading} onClick={addPet}>
              שמור
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPetModal;
