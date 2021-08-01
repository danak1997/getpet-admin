import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { usePets } from '../context/pets';
import { petTypeToText } from '../utils/petType';
import AddPetModal from './AddPetModal';

const PetsPage = () => {
  const { pets } = usePets();

  return (
    <DefaultLayout>
      <Box>
        <Table variant="simple">
          <TableCaption placement="top">רשימת חיות במאגר <AddPetModal /></TableCaption>
          <Thead>
            <Tr>
              <Th>תמונה</Th>
              <Th>שם</Th>
              <Th>תיאור</Th>
              <Th>סוג</Th>
              <Th>גיל</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pets?.map((pet) => (
              <Tr key={pet.id}>
                <Td><img alt="pet" src={pet.profilePhoto} width="64" /></Td>
                <Td>{pet.name}</Td>
                <Td>{pet.description}</Td>
                <Td>{petTypeToText[pet.type]}</Td>
                <Td>{pet.age}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </DefaultLayout>
  );
};

export default PetsPage;
