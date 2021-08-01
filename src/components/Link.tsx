import { chakra, HTMLChakraProps, useColorModeValue } from '@chakra-ui/system';
import * as React from 'react';
import {
  Link as ReactRouterLink
} from 'react-router-dom';

export const Link = (props: HTMLChakraProps<'a'>) => (
  <ReactRouterLink to={props.href || '#'} marginStart="1"
    color={useColorModeValue('blue.500', 'blue.200')}
    _hover={{ color: useColorModeValue('blue.600', 'blue.300') }}
    display={{ base: 'block', sm: 'inline' }}
    {...props}>
  </ReactRouterLink>
);
