import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTableData = createAsyncThunk(
  "table/tableData",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://146.190.118.121/api/table/");
      return { data: res.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
