import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

const MenuBox = ({ text }) => {
    return (
        <Box
            w="100%"
            h="100px"
            bg={useColorModeValue('gray.200', 'gray.700')}
            rounded="md"
            textAlign="center"
            lineHeight="100px"
            fontWeight="bold"
            fontSize="xl"
            mb={4}
        >
            {text}
        </Box>
    );
};

const MainContent = () => {
    return (
        <Box p={4}>
            <Flex justifyContent="space-between" flexWrap="wrap">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                    <MenuBox key={index} text={`Menu ${index}`} />
                ))}
            </Flex>
        </Box>
    );
};

export default MainContent;
