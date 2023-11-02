import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsData } from "ducks/getJobs";
import { Box, Grid, Spinner } from "@chakra-ui/react";
import { useHistory } from "react-router-dom"; // Importa useHistory de react-router-dom
import JobsDataTable from "./components/JobsDataTable";

export default function Results() {
  const dispatch = useDispatch();
  const history = useHistory(); // Obtiene el objeto de historial para redireccionar

  useEffect(() => {
    dispatch(fetchJobsData());
  }, []);

  const { data } = useSelector((state) => state.getJobsData);
  const isLoading = useSelector((state) => state.getJobsData.loading);

  const handleView = (item) => {
    // Calcula el hash MD5 del filename
    const file = item.replace(".mp3", "");

    // Redirige a la URL con el hash MD5 como parte de la ruta
    history.push(`/admin/jobViewer?job=${file}`);

  };

  const handleDownload = (item) => {
    // Lógica para descargar el ítem en CSV
  };

  const handleDelete = (item) => {
    // Lógica para borrar el ítem
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        +
        <JobsDataTable
          data={data}
          handleDelete={handleDelete}
          handleDownload={handleDownload}
          handleView={handleView}
          isLoading={isLoading}
        />
      </Grid>
    </Box>
  );
}
