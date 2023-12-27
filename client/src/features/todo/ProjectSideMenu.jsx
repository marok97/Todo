import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import SideMenu from "./components/SideMenu";

const Projects = () => {
  return (
    <Box bgcolor="background.paper" flex={1} maxWidth={350}>
      <Typography variant="h5" fontWeight={"bold"} marginLeft={2} marginTop={3}marginBottom={3}>
        Projects
      </Typography>
      <Divider />
      <SideMenu />
    </Box>
  );
};

export default Projects;
