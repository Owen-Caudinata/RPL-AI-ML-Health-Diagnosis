import { Box, Flex, Button, Heading, useTheme } from "@chakra-ui/react";
import { useAuth } from "../hooks/AuthProvider";

const Home = () => {
    const theme = useTheme();
    const auth = useAuth();

    return (
        <Box>
            <Flex
                bg={theme.colors.cyan[500]}
                w="100%"
                p={4}
                align="center"
                justify="space-between"
            >
                <Flex align="center" mr={5}>
                    <Heading as="h1" size="lg" color="white">
                        RPL-2 Admin Side
                    </Heading>
                </Flex>
                <Flex>
                    <Button
                        as="a"
                        href="/profile"
                        mr={4}
                        color={theme.colors.cyan[900]}
                        bg={theme.colors.cyan[200]}
                        _hover={{ bg: theme.colors.cyan[300] }}
                    >
                        Profile
                    </Button>
                    <Button
                        onClick={() => auth.logOut()}
                        mr={4}
                        bg={theme.colors.cyan[900]}
                        color={theme.colors.cyan[50]}
                        _hover={{ bg: theme.colors.cyan[800] }}
                    >
                        Logout
                    </Button>
                </Flex>
            </Flex>
            <Box p={4}>
                <Heading as="h2" size="md">
                    Welcome to RPL-2 Admin Side
                </Heading>
            </Box>
        </Box>
    );
};

export default Home;
