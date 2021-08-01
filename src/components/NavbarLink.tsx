import React from 'react';
import { ReactNode } from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import { Link } from './Link';
import {
  Link as ReactRouterLink
} from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const NavLink = ({ children, href = '/login' }: { children: ReactNode, href: string }) => (
  <ReactRouterLink to={href || '#'}>
    <Button px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }} variant="ghost">{children}</Button>
  </ReactRouterLink>
);

export default NavLink;
