import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const Alzheimer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("http://localhost:3000/alzheimer");
        // const jsonData = await response.json();
        const jsonData = [{ ini: "hasil" }];
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>{data.length > 0 && Object.keys(data[0]).map((key) => <Th key={key}>{key}</Th>)}</Tr>
      </Thead>
      <Tbody>
        {data.map((item, index) => (
          <Tr key={index}>
            {Object.values(item).map((value, index) => (
              <Td key={index}>{value}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Alzheimer;
