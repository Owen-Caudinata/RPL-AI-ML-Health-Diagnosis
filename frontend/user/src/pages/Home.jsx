import { Box, Flex, Button, Heading, Text, Grid, useTheme } from "@chakra-ui/react";
import { useAuth } from "../hooks/AuthProvider";
import { useState, useEffect } from "react";
import landingpagedoctor from "../assets/landingpagedoctor.svg";

const Home = () => {
  const theme = useTheme();
  const auth = useAuth();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Set the fade-in effect after a short delay when the component mounts
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 500); // Adjust the delay time as needed

    // Clear the timeout to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      <Flex bg={theme.colors.cyan[500]} w="100%" p={4} align="center" justify="space-between">
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" color="white">
            Web Logo
          </Heading>
        </Flex>
        <Flex>
          <Button as="a" href="/alzheimer" mr={4} color={theme.colors.cyan[900]} bg={theme.colors.cyan[200]} _hover={{ bg: theme.colors.cyan[300] }}>
            Alzheimer
          </Button>
          <Button as="a" href="/pneumonia" mr={4} color={theme.colors.cyan[900]} bg={theme.colors.cyan[200]} _hover={{ bg: theme.colors.cyan[300] }}>
            Pneumonia
          </Button>
          <Button as="a" href="/ehr" mr={4} color={theme.colors.cyan[900]} bg={theme.colors.cyan[200]} _hover={{ bg: theme.colors.cyan[300] }}>
            Electronic Health Record
          </Button>
          <Button onClick={() => auth.logOut()} mr={4} bg={theme.colors.cyan[900]} color={theme.colors.cyan[50]} _hover={{ bg: theme.colors.cyan[800] }}>
            Logout
          </Button>
        </Flex>
      </Flex>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8} p={4} mt={20}>
        <Box>
          <Heading
            as="h1"
            fontSize={"5xl"}
            color={theme.colors.cyan[600]}
            textAlign="left"
            ml={{ base: 5, md: 10 }}
            opacity={fadeIn ? 1 : 0}
            transition="opacity 0.5s ease-in-out"
            fontFamily="heading"
            fontWeight="bold"
            letterSpacing="7px"
            lineHeight="60px"
          >
            Optimize Your Health <br />
            Care: Easily obtain <br />
            accurate health results.
          </Heading>
          <Text lineHeight="25px" letterSpacing="0.5px" mt={10} ml={{ base: 5, md: 10 }} color={theme.colors.cyan[700]} fontSize="md">
            Our user-friendly platform enables you to manage your health more <br />
            easily, providing a convenient way to obtain the care you need. Take <br />
            control of your health with ease and precision - because your well- <br />
            being deserves the best.
          </Text>
        </Box>
        <Box opacity={fadeIn ? 1 : 0} transition="opacity 0.5s ease-in-out" ml={{ md: 20 }}>
          <img src={landingpagedoctor} style={{ width: "90%", height: "auto" }} />
        </Box>
      </Grid>
    </Box>
  );
};

export default Home;
