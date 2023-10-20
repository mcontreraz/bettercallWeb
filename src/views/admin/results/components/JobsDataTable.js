import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { MdVisibility, MdFileDownload, MdDelete } from "react-icons/md";
import { IconButton, Spacer } from "@chakra-ui/react";

const JobsDataTable = (props) => {
  const { data, handleView, handleDownload, handleDelete } = props;

  const getJobStatusText = (status) => {
    switch (status) {
      case "STARTED":
        return "EN PROGRESO";
      case "FINISHED":
        return "LISTO";
      case "ERROR":
        return "ERROR";
      default:
        return status; // En caso de que haya otros estados no especificados
    }
  };

  return (
    <Box overflowX="auto" boxShadow="sm" p={5} borderRadius="md" bg="white">
      <Table variant="simple" >
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
                  onClick={() => handleView(item)}
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
    </Box>
  );
};

export default JobsDataTable;
