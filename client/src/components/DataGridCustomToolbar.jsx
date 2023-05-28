import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setPaginationModel } from "state";

const DataGridCustomToolbar = ({ knessetInput, setKnessetInput }) => {
  const dispatch = useDispatch(); // Add this line
  const paginationModel = useSelector((state) => state.global.paginationModel);
  const handleKnessetInput = (e, value) => {
    const knessetNum = parseInt(value);
    dispatch(
      setPaginationModel({
        // Dispatch the action instead
        ...paginationModel,
        page: 0,
        knessetNum: knessetNum,
      })
    );
    setKnessetInput(knessetNum);
  };
  return (
    <GridToolbarContainer dir="ltr">
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton title="עמודות" />
          <GridToolbarDensitySelector title="רוחב" />
        </FlexBetween>

        <Autocomplete
          disablePortal
          options={[...Array(25).keys()].map((i) => i + 1)}
          renderInput={(params) => (
            <TextField dir="rtl" {...params} label="מספר כנסת..." />
          )}
          getOptionLabel={(option) => option.toString()}
          sx={{ width: "8rem", mb: "0.5rem" }}
          onChange={handleKnessetInput}
          value={knessetInput}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
