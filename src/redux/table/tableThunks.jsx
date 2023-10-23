import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTableData = createAsyncThunk(
  "table/tableData",
  async ({ offset }, thunkAPI) => {
    try {
      const res = await axios.get(`http://146.190.118.121/api/table/?limit=10&offset=${offset}`);
      return { data: res.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateLine = createAsyncThunk(
  'table/updateLine',
  async (line, thunkAPI) => {
    try {
      const res = await axios.put(`http://146.190.118.121/api/table/${line.id}`, line);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);