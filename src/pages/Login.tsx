import { Box, Button, Heading, SimpleGrid, Text, VisuallyHidden, chakra, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import axios from 'axios';
import * as React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { Card } from '../components/Card';
import { DividerWithText } from '../components/DividerWithText';
import { Link } from '../components/Link';
import { Logo } from '../components/Logo';
import { PasswordField } from '../components/PasswordField';
import UserContext from '../context/user';
import FullScreenLayout from '../layouts/FullScreenLayout';
import { saveToken } from '../utils/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setUser] = useContext(UserContext);
  const router = useHistory();


  const handleLogin = () => {   
    (async () => {
      try {
        const response = await axios.post('/api/user/login', {
          email,
          password
        });
        const token = response.data.token;

        if (!token) throw new Error('Invalid Token');

        saveToken(token);
        setUser({
          loggedIn: true
        });
        router.push('/');
      } catch (error) {
        console.error(error);
      }
    })();
  };

  return (
    <FullScreenLayout>
      <Box maxW="md" mx="auto" alignSelf="center">
        <Logo mx="auto" mb={5} />
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
        התחברות
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">עדיין לא רשום?</Text>
          <Link href="/register" mr={2}>הירשם כאן!</Link>
        </Text>
        <Card>
          <chakra.form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <Stack spacing="6">
              <FormControl id="email">
                <FormLabel>כתובת מייל:</FormLabel>
                <Input name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </FormControl>
              <PasswordField value={password} onChange={(e) => setPassword(e.target.value)}  />
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
        התחבר
              </Button>
            </Stack>
          </chakra.form>
          <DividerWithText mt="6">או התחבר באמצעות</DividerWithText>
          <SimpleGrid mt="6" columns={3} spacing="3">
            <Button color="currentColor" variant="outline">
              <VisuallyHidden>Login with Facebook</VisuallyHidden>
              <FaFacebook />
            </Button>
            <Button color="currentColor" variant="outline">
              <VisuallyHidden>Login with Google</VisuallyHidden>
              <FaGoogle />
            </Button>
            <Button color="currentColor" variant="outline">
              <VisuallyHidden>Login with Github</VisuallyHidden>
              <FaGithub />
            </Button>
          </SimpleGrid>
        </Card>
      </Box>
    </FullScreenLayout>
  );
};

export default LoginPage;
