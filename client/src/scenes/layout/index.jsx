import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useGetVotesQuery } from "state/api";

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
      <Outlet />
    </Box>
  );
};

export default Layout;
