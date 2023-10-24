import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";

export const fetchTableData = createAsyncThunk(
  "table/tableData",
  async (offset, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://technical-task-api.icapgroupgmbh.com/api/table/?limit=10&offset=${offset}`
      );
      return { data: res.data };
    } catch (error) {
      Notiflix.Notify.failure(error.message);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateLine = createAsyncThunk(
  "table/updateLine",
  async (line, thunkAPI) => {
    try {
      const res = await axios.put(
        `https://technical-task-api.icapgroupgmbh.com/api/table/${line.id}/`,
        line
      );
      return res.data;
    } catch (error) {
      if (error.response) {
        Notiflix.Notify.failure(
          `An error occurred on the server, check the entered data for correctness: ${error.response.status} - ${error.response.statusText}`
        );
      } else if (error.request) {
        Notiflix.Notify.failure(
          "Network problems. Please check your internet connection."
        );
      } else {
        Notiflix.Notify.failure(
          "An unknown error has occurred. Please try again."
        );
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
