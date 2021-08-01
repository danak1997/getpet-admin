import React from 'react';
import Head from '../components/Head';
import Navbar from '../components/Navbar';
import { Box, useColorModeValue } from '@chakra-ui/react';

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Head />
      <Navbar />
      <main>
        <Box p={4} minH="calc(100vh - 4rem - 1px)" bg={useColorModeValue('gray.100', 'gray.900')}>
          {children}
        </Box>
      </main>
    </div>
  );
};

export default DefaultLayout;
