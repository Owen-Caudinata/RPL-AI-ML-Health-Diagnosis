import React from "react";
import { useTheme, Container, Grid, useColorModeValue } from "@chakra-ui/react";
import { useAuth } from "../hooks/AuthProvider";
import MenuBox from "../components/MenuBox";


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

                    <MenuBox path={"/alzheimer"} bgColor={bgColor} hoverBgColor={hoverBgColor} text={"Alzheimer Inference"} />
                    <MenuBox path={"/pneumonia"} bgColor={bgColor} hoverBgColor={hoverBgColor} text={"Pneumonia Inference"} />
                    <MenuBox path={"/ehr"} bgColor={bgColor} hoverBgColor={hoverBgColor} text={"EHR"} />
                    <MenuBox path={"/daily-newsletter"} bgColor={bgColor} hoverBgColor={hoverBgColor} text={"Daily Newsletter"} />
                    <MenuBox path={"/feedback"} bgColor={bgColor} hoverBgColor={hoverBgColor} text={"User Feedbacks"} />
                    <MenuBox path={"/fetal"} bgColor={bgColor} hoverBgColor={hoverBgColor} text={"Fetal Health"} />
                    <MenuBox path={"/Drugs"} bgColor={bgColor} hoverBgColor={hoverBgColor} text={"Drugs Database"} />
                    <MenuBox path={"/#"} bgColor={bgColor} hoverBgColor={hoverBgColor} text={"Coming Soon"} />

                </Grid>
            </Container>
        </>
    );
};

export default Home;
