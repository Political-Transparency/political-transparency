import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  selectedBills: [],
  paginationModel: {
    page: 0,
    pageSize: 20,
    knessetNum: 1,
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "dark" : "light";
    },
    setSelectedBills: (state, action) => {
      state.selectedBills = action.payload;
    },
    setPaginationModel: (state, action) => {
      state.paginationModel = {
        ...state.paginationModel,
        ...action.payload,
      };
    },
  },
});

export const { setMode, setSelectedBills, setPaginationModel } =
  globalSlice.actions;

export default globalSlice.reducer;
