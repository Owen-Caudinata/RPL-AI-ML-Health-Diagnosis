import React from "react";
import { useTheme, Container, Grid, useColorModeValue, Heading } from "@chakra-ui/react";
import { useAuth } from "../hooks/AuthProvider";
import MenuBox from "../components/MenuBox";
import { BiBrain } from 'react-icons/bi';
import { FaLungsVirus } from 'react-icons/fa';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { MdOutlineFeedback, MdOutlineChildCare, MdMedication, MdOutlineArticle } from 'react-icons/md';
import { IoDocumentsOutline } from 'react-icons/io5';
import { AiOutlineRobot } from 'react-icons/ai';



const Home = () => {
    const theme = useTheme();
    const auth = useAuth();

    const bgColor = useColorModeValue("cyan.100", "cyan.900");
    const hoverBgColor = useColorModeValue("cyan.200", "cyan.700");

    return (

        <Container maxW="container.xl" mt="8" mb="32">
            <Heading>Welcome to Doc.ai Admin Dashboard</Heading>
            <Grid
                templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
                gap={6}
                mt={8}
                mb={8}
                height={{ base: "auto", md: "70vh" }}
            >

                <MenuBox path="/alzheimer" bgColor={bgColor} hoverBgColor={hoverBgColor} text="Alzheimer Inference" IconComponent={BiBrain} />
                <MenuBox path="/pneumonia" bgColor={bgColor} hoverBgColor={hoverBgColor} text="Pneumonia Inference" IconComponent={FaLungsVirus} />
                <MenuBox path="/ehr" bgColor={bgColor} hoverBgColor={hoverBgColor} text="EHR" IconComponent={IoDocumentsOutline} />
                <MenuBox path="/daily-newsletter" bgColor={bgColor} hoverBgColor={hoverBgColor} text="Daily Newsletter" IconComponent={HiOutlineNewspaper} />
                <MenuBox path="/feedback" bgColor={bgColor} hoverBgColor={hoverBgColor} text="User Feedbacks" IconComponent={MdOutlineFeedback} />
                <MenuBox path="/fetal" bgColor={bgColor} hoverBgColor={hoverBgColor} text="Fetal Health" IconComponent={MdOutlineChildCare} />
                <MenuBox path="/drugsdatabank" bgColor={bgColor} hoverBgColor={hoverBgColor} text="Drugs Databank" IconComponent={MdMedication} />
                <MenuBox path="/blog" bgColor={bgColor} hoverBgColor={hoverBgColor} text="Blog" IconComponent={MdOutlineArticle} />
                <MenuBox path="/rag" bgColor={bgColor} hoverBgColor={hoverBgColor} text="RAG" IconComponent={AiOutlineRobot} />


            </Grid>
        </Container>

    );
};

export default Home;
