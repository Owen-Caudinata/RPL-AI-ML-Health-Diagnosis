import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import Navbar from "../components/Navbar";
import { Box, useTheme } from "@chakra-ui/react";

const PrivateRoute = () => {
    const theme = useTheme();
    const auth = useAuth();
    if (!auth.token) return <Navigate to="/login" />;
    // return <Outlet />;

    return (
        <Box mx={{ base: "2", md: "32"  }}>
            <Navbar theme={theme} auth={auth} />
            <Box mx="auto" maxW="container.xl" mt="8">
                <Outlet />
            </Box>
        </Box>
    )
};

export default PrivateRoute;