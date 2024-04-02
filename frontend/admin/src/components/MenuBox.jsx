import { Box, Flex } from '@chakra-ui/react';
import { Logo } from './Logo';
import { useNavigate } from 'react-router-dom';

const MenuBox = ({ path, bgColor, hoverBgColor, text }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(path);
    };

    return (
        <Box
            p={4}
            borderRadius="md"
            bg={bgColor}
            _hover={{ bg: hoverBgColor }}
            onClick={handleClick}
            cursor="pointer"
        >
            <Flex align="center" justify="center" direction="column" h="100%">
                <Logo />
                <Box mt={8}>
                    <span>{text}</span>
                </Box>
            </Flex>
        </Box>
    );
};

export default MenuBox;
