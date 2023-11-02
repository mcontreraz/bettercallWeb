import React from "react";
import { Box, Text, Spinner, Flex } from "@chakra-ui/react";

function JobCard({ data, isLoading }) {
  console.log("🚀 ~ file: jobCard.js:5 ~ JobCard ~ isLoading:", isLoading);
  return (
    <>
      <Box
        backgroundColor="white"
        padding="20px"
        boxShadow="sm" // Añade una sombra ligera para dar profundidad
        borderRadius="md" // Redondea un poco las esquinas
      >
        <Text
          fontWeight="bold"
          marginBottom="10px"
          fontSize="xl"
          borderBottom="1px solid"
          borderColor="gray.200"
          paddingBottom="10px"
        >
          Transcripción:
        </Text>
        <Flex justify={"center"}>
          {isLoading && <Spinner size="xl" color="blue.500" />}
        </Flex>

        <Text marginTop="10px">{data}</Text>
      </Box>
    </>
  );
}

export default JobCard;
