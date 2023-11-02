import React from "react";
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Icon,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";
import {
  MdVisibility,
  MdFileDownload,
  MdDelete,
  MdChangeCircle,
  MdOutlineError,
  MdCheckCircle,
} from "react-icons/md";
import { IconButton, Spinner } from "@chakra-ui/react";

const JobsDataTable = (props) => {
  const { data, handleView, handleDownload, handleDelete, isLoading } = props;
  console.log(
    "🚀 ~ file: JobsDataTable.js:15 ~ JobsDataTable ~ isLoading:",
    isLoading
  );

  const getJobStatusText = (status) => {
    switch (status) {
      case "STARTED":
        return (  
          <Flex align="center">
          <Icon
            w="24px"
            h="24px"
            me="5px"
            color="yellow.500"
            as={MdChangeCircle}
          />
          En Progreso
        </Flex>
        )
      case "FINISHED":
        return (
          <Flex align="center">
            <Icon
              w="24px"
              h="24px"
              me="5px"
              color="green.500"
              as={MdCheckCircle}
            />
            Finalizado
          </Flex>
        );
      case "ERROR":
        return (
          <Flex align="center">
            <Icon
              w="24px"
              h="24px"
              me="5px"
              color="red.500"
              as={MdOutlineError}
            />
            ERROR
          </Flex>
        );
      default:
        return status; // En caso de que haya otros estados no especificados
    }
  };

  return (
    <Box overflowX="auto" boxShadow="sm" p={5} borderRadius="md" bg="white">
      {isLoading ? (
        <Flex justify="center">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nombre del archivo</Th>
                <Th>Estado</Th>
                <Th>Fecha</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => (
                <Tr
                  key={index}
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  _hover={{ bg: "gray.200" }}
                >
                  <Td>{item[1]}</Td>
                  <Td>{getJobStatusText(item[2])}</Td>
                  <Td>{item[3]}</Td>

                  <Td mb={0} p={0}>
                    <IconButton
                      aria-label="Ver"
                      icon={<MdVisibility size="20px" />}
                      colorScheme="brand"
                      onClick={() => handleView(item[1])}
                      mr={2} // margen a la derecha para separar los botones
                      size="sm"
                    />
                    <IconButton
                      aria-label="Descargar"
                      icon={<MdFileDownload size="20px" />}
                      colorScheme="teal"
                      onClick={() => handleDownload(item)}
                      mr={2} // margen a la derecha para separar los botones
                      size="sm"
                    />
                    <IconButton
                      aria-label="Borrar"
                      icon={<MdDelete size="20px" />}
                      colorScheme="red"
                      onClick={() => handleDelete(item)}
                      size="sm"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}
    </Box>
  );
};

export default JobsDataTable;
