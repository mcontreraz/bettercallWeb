/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsData } from "ducks/getJobs";

// Chakra imports
import { Box, Grid } from "@chakra-ui/react";

// Custom components

import { columnsDataComplex } from "views/admin/dataTables/variables/columnsData";
import JobsDataTable from "./components/JobsDataTable";

export default function Results() {

  const dispatch = useDispatch();

  // TODO hacer dispatch a check all jobs agregar boton actualizar, funcionalidades de botones

  useEffect(() => {
    dispatch(fetchJobsData());
  }
  , []);

  const { data } = useSelector((state) => state.getJobsData);

  const handleView = (item) => {
    // Lógica para ver el ítem
  };
  
  const handleDownload = (item) => {
    // Lógica para descargar el ítem en CSV
  };
  
  const handleDelete = (item) => {
    // Lógica para borrar el ítem
  };
  

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
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
        <JobsDataTable 
        data={data}
        handleDelete={handleDelete}
        handleDownload={handleDownload}
        handleView={handleView}
        />
      </Grid>
    </Box>
  );
}
