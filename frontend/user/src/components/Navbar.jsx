import React from 'react';
import { Box, Heading, Button, Flex, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Navbar = ({ theme, auth }) => {
  return (
    <Box position="fixed" top="0" left="0" width="100%" zIndex="1000" bg={theme.colors.cyan[700]} p={4}>
      <Flex align="center" justify="space-between">
        <Heading as="h1" size="lg" color="white">
          Web Logo
        </Heading>
        <Flex>
          <Button as="a" href="/reminder" mr={4} color={theme.colors.cyan[900]} bg={theme.colors.cyan[200]} _hover={{ bg: theme.colors.cyan[300] }}>
            Reminder
          </Button>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mr={4} color={theme.colors.cyan[900]} bg={theme.colors.cyan[200]} _hover={{ bg: theme.colors.cyan[300] }}>
              Health Report
            </MenuButton>
            <MenuList>
              <MenuItem as="a" href="/alzheimer">Alzheimer</MenuItem>
              <MenuItem as="a" href="/pneumonia">Pneumonia</MenuItem>
              <MenuItem as="a" href="/fetal">Fetal Health</MenuItem>
              <MenuItem as="a" href="/ehr">Electronic Health Record</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mr={4} color={theme.colors.cyan[900]} bg={theme.colors.cyan[200]} _hover={{ bg: theme.colors.cyan[300] }}>
              Knowledge Base
            </MenuButton>
            <MenuList>
              <MenuItem as="a" href="/chatbot">Doc.ai</MenuItem>
              <MenuItem as="a" href="/pneumonia">Drugs Databank</MenuItem>
              <MenuItem as="a" href="/blog">Our Blogs</MenuItem>
            </MenuList>
          </Menu>

        
          <Button as="a" href="/ehr" mr={4} color={theme.colors.cyan[900]} bg={theme.colors.cyan[200]} _hover={{ bg: theme.colors.cyan[300] }}>
            Find a Doctor
          </Button>

        
          <Button onClick={() => auth.logOut()} mr={4} bg={theme.colors.cyan[900]} color={theme.colors.cyan[50]} _hover={{ bg: theme.colors.cyan[800] }}>
            Logout
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
