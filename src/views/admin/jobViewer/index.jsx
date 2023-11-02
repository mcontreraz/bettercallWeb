import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTranscriptData } from "ducks/getTranscript";
import { Box, Grid } from "@chakra-ui/react";
import JobCard from "./components/jobCard";

export default function JobViewer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filename = searchParams.get("job");

  const dispatch = useDispatch();

  useEffect(() => {
    if (filename) {
      // Envía el nombre del archivo al dispatch para solicitar la transcripción
      dispatch(fetchTranscriptData(filename));
    }
  }, [dispatch, filename]);

  const transcriptData = useSelector(
    (state) => state.getTranscriptedAudio?.data
  );
  const isLoading = useSelector((state) => state.getTranscriptedAudio?.loading);

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
        <JobCard data={transcriptData} isLoading={isLoading} />
      </Grid>
    </Box>
  );
}
