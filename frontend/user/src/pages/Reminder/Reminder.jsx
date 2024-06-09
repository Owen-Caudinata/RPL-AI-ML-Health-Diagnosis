import React, { useState, useEffect } from "react";
import { Button, Box, Text, useToast } from "@chakra-ui/react";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

const mainApiUrl = import.meta.env.VITE_MAIN_API_URL;

const Reminder = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [data, setData] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(mainApiUrl + "/reminder/get", {
          //TODO: CHANGE API URL
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const onEdit = async (id) => {
    navigate(`/reminder/edit/${id}`);
  };

  const onDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        const response = await fetch(mainApiUrl + `/reminder/delete/${id}`, {
          //TODO: CHANGE API URL
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (response.ok) {
          setData(data.filter((item) => item.id !== id)); // Remove the deleted item from the state
          toast({
            title: "Record deleted",
            description: `Record with ID ${id} has been deleted.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          console.error("Error deleting data:", await response.text());
        }
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  return (
    <Box mt={32}>
      <Button as="a" href="/reminder-add" colorScheme="teal" mb={4}>
        Add Reminder
      </Button>

      {data.map((item, index) => (
        <Box
          key={index}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          mb={4}
        >
          <Text fontWeight="bold">ID: {item.id}</Text>
          <Text>Created At: {item.createdAt}</Text>
          <Text>Updated At: {item.updatedAt}</Text>
          <Text>Title: {item.title}</Text>
          <Text>Content: {item.content}</Text>

          <Button
            colorScheme="blue"
            size="sm"
            onClick={() => onEdit(item.id)}
            mt={2}
            mr={2}
          >
            Edit
          </Button>

          <Button
            colorScheme="red"
            size="sm"
            onClick={() => onDelete(item.id)}
            mt={2}
          >
            Delete
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default Reminder;
