import React, { useState, useEffect } from "react";
import { Input, Button, Box, useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;

const EditReminder = () => {
  const auth = useAuth();
  const { id } = useParams(); // Get the ID parameter from the URL
  const [data, setData] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const toast = useToast();

  const handleSave = async () => {
    try {
      const response = await fetch(mainApiUrl + `/reminder/edit/${id}`, {
        method: "PUT", // Or appropriate HTTP method
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Record updated");
        toast({
          title: "Record updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate(-1);
      } else {
        console.error("Error updating record");
        toast({
          title: "Error updating record",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating record:", error);
      toast({
        title: "Error updating record",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mt={32}>
      <h1>Edit Record {id}</h1>
      <Input
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
        placeholder="Title"
        mb={4}
      />
      <Input
        value={data.content}
        onChange={(e) => setData({ ...data, content: e.target.value })}
        placeholder="Content"
        mb={4}
      />
      <Button colorScheme="teal" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
};

export default EditReminder;
