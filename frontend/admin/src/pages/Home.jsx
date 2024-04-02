import React from "react";
import { useTheme, Container, Grid, Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { useAuth } from "../hooks/AuthProvider";
import { Logo } from "../components/Logo";

const Home = () => {
    const theme = useTheme();
    const auth = useAuth();

    const bgColor = useColorModeValue("cyan.100", "cyan.900");
    const hoverBgColor = useColorModeValue("cyan.200", "cyan.700");

    return (
        <>
            <Container maxW="container.xl" mt="8">
                <h1>Welcome to the Homepage</h1>
                <Grid
                    templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
                    gap={6}
                    mt={8}
                    height={{ base: "auto", md: "70vh" }}
                >
                    {/* Menu Box 1 */}
                    <Box p={4} borderRadius="md" bg={bgColor} _hover={{ bg: hoverBgColor }} >
                        <Flex align="center" justify="center" direction="column" h="100%">
                            <Logo />
                            <span>Menu 1</span>
                        </Flex>
                    </Box>
                    {/* Menu Box 2 */}
                    <Box p={4} borderRadius="md" bg={bgColor} _hover={{ bg: hoverBgColor }}>
                        <Flex align="center" justify="center" direction="column" h="100%">
                            <Logo />
                            <span>Menu 1</span>
                        </Flex>
                    </Box>
                    {/* Menu Box 3 */}
                    <Box p={4} borderRadius="md" bg={bgColor} _hover={{ bg: hoverBgColor }}>
                        <Flex align="center" justify="center" direction="column" h="100%">
                            <Logo />
                            <span>Menu 1</span>
                        </Flex>
                    </Box>
                    {/* Menu Box 4 */}
                    <Box p={4} borderRadius="md" bg={bgColor} _hover={{ bg: hoverBgColor }}>
                        <Flex align="center" justify="center" direction="column" h="100%">
                            <Logo />
                            <span>Menu 1</span>
                        </Flex>
                    </Box>
                    {/* Menu Box 5 */}
                    <Box p={4} borderRadius="md" bg={bgColor} _hover={{ bg: hoverBgColor }}>
                        <Flex align="center" justify="center" direction="column" h="100%">
                            <Logo />
                            <span>Menu 1</span>
                        </Flex>
                    </Box>
                    {/* Menu Box 6 */}
                    <Box p={4} borderRadius="md" bg={bgColor} _hover={{ bg: hoverBgColor }}>
                        <Flex align="center" justify="center" direction="column" h="100%">
                            <Logo />
                            <span>Menu 1</span>
                        </Flex>
                    </Box>
                    {/* Menu Box 7 */}
                    <Box p={4} borderRadius="md" bg={bgColor} _hover={{ bg: hoverBgColor }}>
                        <Flex align="center" justify="center" direction="column" h="100%">
                            <Logo />
                            <span>Menu 1</span>
                        </Flex>
                    </Box>
                    {/* Menu Box 8 */}
                    <Box p={4} borderRadius="md" bg={bgColor} _hover={{ bg: hoverBgColor }}>
                        <Flex align="center" justify="center" direction="column" h="100%">
                            <Logo />
                            <span>Menu 1</span>
                        </Flex>
                    </Box>
                </Grid>
            </Container>
        </>
    );
};

export default Home;
