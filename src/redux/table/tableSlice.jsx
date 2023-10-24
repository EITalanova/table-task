import { createSlice } from "@reduxjs/toolkit";
import { fetchTableData, updateLine } from "./tableThunks";

const initialState = {
  limit: 10,
  offset: 0,
  tableData: [],
  isLoading: false,
  error: null,
  isEditMode: false,
};

const tableSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    setOffset: (state, { payload }) => {
      state.offset = payload;
    },
    setIsEditMode: (state, { payload }) => {
      state.isEditMode = payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchTableData.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(fetchTableData.fulfilled, (state, { payload }) => {
        state.tableData = payload.data;
        state.isLoading = false;
      })
      .addCase(fetchTableData.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(updateLine.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(updateLine.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;

        const updatedLineIndex = state.tableData.results.findIndex(
          (line) => line.id === payload.id
        );
        if (updatedLineIndex !== -1) {
          state.tableData.results[updatedLineIndex] = payload;
        }
      })
      .addCase(updateLine.rejected, (state, { payload }) => {
        state.isLoading = false;
      }),
});

export const tableReducer = tableSlice.reducer;
export const { setOffset } = tableSlice.actions;
