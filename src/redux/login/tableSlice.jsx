import { createSlice } from '@reduxjs/toolkit';
import { fetchTableData } from './tableThunks';

const initialState = {
  tableData: [],
  isLoading: false,
};

const tableSlice = createSlice({
  name: 'tableData',
  initialState,
  reducers: {},
  extraReducers: builder =>
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
      }),
});

export const tableReducer = tableSlice.reducer;
