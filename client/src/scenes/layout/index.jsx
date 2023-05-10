import React, { useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Home from "scenes/home";

// import { useGetBillsQuery } from "state/api"

const Layout = () => {
  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Home />
    </Box>
  );
};

export default Layout;
