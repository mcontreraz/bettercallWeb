import React from "react";

// Chakra imports
import { Box, Grid } from "@chakra-ui/react";
import Upload from "./components/Upload";

export default function AnalizeRecord() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
      >
        <Upload
          gridArea={{

            lg: "1 / 1 / 2 / 4",
          }}
          minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
          pe="20px"
          pb={{ base: "100px", lg: "20px" }}
        />
      </Grid>
    </Box>
  );
}
