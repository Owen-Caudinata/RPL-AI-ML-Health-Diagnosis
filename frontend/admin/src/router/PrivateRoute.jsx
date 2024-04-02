import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import Navbar from "../components/Navbar";
import { Box } from "@chakra-ui/react";

const PrivateRoute = () => {
    const user = useAuth();
    if (!user.token) return <Navigate to="/login" />;
    return (
        <Box mx={{ base: "2", md: "32" }}>
            <Navbar />
            <Box mx="auto" maxW="container.xl" mt="8">
                <Outlet />
            </Box>
        </Box>
    );
};

export default PrivateRoute;