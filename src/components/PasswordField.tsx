import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputLeftElement,
  useDisclosure,
  useMergeRefs,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import React from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { Link } from './Link';

export const PasswordField = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const mergeRef = useMergeRefs(inputRef, ref);

  const onClickReveal = () => {
    onToggle();
    const input = inputRef.current;
    if (input) {
      input.focus({ preventScroll: true });
      const length = input.value.length * 2;
      requestAnimationFrame(() => {
        input.setSelectionRange(length, length);
      });
    }
  };

  return (
    <FormControl id="password">
      <Flex justify="space-between">
        <FormLabel>סיסמא:</FormLabel>
        <Box color={mode('blue.600', 'blue.200')} fontWeight="semibold" fontSize="sm">
          <Link href="/forgot" tabIndex={-1}>שכחתי סיסמא</Link>
        </Box>
      </Flex>
      <InputGroup>
        <Input
          ref={mergeRef}
          name="password"
          type={isOpen ? 'text' : 'password'}
          autoComplete="password"
          required
          pr={4}
          pl={8}
          {...props}
        />
        <InputLeftElement>
          <IconButton
            bg="transparent !important"
            variant="ghost"
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputLeftElement>
      </InputGroup>
    </FormControl>
  );
});

PasswordField.displayName = 'PasswordField';
