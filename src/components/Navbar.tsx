import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Icon,
  useColorMode,
  MenuGroup,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import NavbarLink from './NavbarLink';
import { AiOutlineClose } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import React from 'react';

const links = [
  { url: '/', name: 'ראשי' },
  { url: '/pets', name: 'חיות' },
  { url: '/reports', name: 'דיווחים' },
  { url: '/users', name: 'משתמשים' },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.600', 'white')}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      px={4}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <Icon as={AiOutlineClose} /> : <Icon as={GiHamburgerMenu} />}
          aria-label={'Open Menu'}
          display={{ md: !isOpen ? 'none' : 'inherit' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>GetPet</Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {links.map((link) => (
              <NavbarLink href={link.url} key={link.url}>{link.name}</NavbarLink>
            ))}
          </HStack>
        </HStack>
        <HStack>
          <InputGroup>
            <InputLeftElement pointerEvents="none"><SearchIcon color="gray.300" /></InputLeftElement>
            <Input type="text" placeholder="חיפוש..." pr={4}
              pl={8} />
          </InputGroup>
          <Menu>
            <MenuButton as={Button} minW="auto" rounded={'full'} variant={'link'} cursor={'pointer'}>
              <Avatar
                size="sm"
                src={
                  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
              />
            </MenuButton>
            <MenuList zIndex={9999}>
              <MenuGroup title="הגדרות">
                <MenuItem command="T⌘" onClick={toggleColorMode}>מצב {colorMode === 'light' ? 'חשוך' : 'בהיר'}</MenuItem>
                <MenuItem>עוד אפשרויות</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="פרופיל">
                <MenuItem>ערוך</MenuItem>
                <MenuItem>התנתק</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4}>
          <Stack as={'nav'} spacing={4}>
            {links.map((link) => (
              <NavbarLink href={link.url} key={link.url}>{link.name}</NavbarLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
