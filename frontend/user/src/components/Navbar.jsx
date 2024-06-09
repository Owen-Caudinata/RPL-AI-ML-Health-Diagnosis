import React from 'react';
import { Box, Heading, Button, Flex, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ProductLogo } from '../components/ProductLogo';

const Navbar = ({ theme, auth }) => {
  return (
    <Box position="fixed" top="0" left="0" width="100%" zIndex="1000" bg={theme.colors.cyan[700]} p={4}>
      <Flex align="center" justify="space-between">

        <Flex align="center" justify="space-between" px={4}>
          <ProductLogo size={60} />
          <Heading as="h1" size="lg" color="white" ml={4}>
            Doc.ai
          </Heading>
        </Flex>

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
              <MenuItem as="a" href="/drugsdatabank">Drugs Databank</MenuItem>
              <MenuItem as="a" href="/blog">Our Blogs</MenuItem>
            </MenuList>
          </Menu>


          <Button as="a" href="/appointment" mr={4} color={theme.colors.cyan[900]} bg={theme.colors.cyan[200]} _hover={{ bg: theme.colors.cyan[300] }}>
            Find a Doctor
          </Button>

          <Button as="a" href="/feedback" mr={4} color={theme.colors.cyan[900]} bg={theme.colors.cyan[200]} _hover={{ bg: theme.colors.cyan[300] }}>
            Feedback
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
