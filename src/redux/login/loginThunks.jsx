import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const thunkUser = createAsyncThunk(
  "login/loginUser",

  async ({ rejectWithValue, ...userData }) => {
    try {
      const {
        data: { user, token },
      } = await axios.post(
        `https://technical-task-api.icapgroupgmbh.com/api/login/`,
        userData
      );

      setAuthHeader(token);
      return { user, token };
    } catch (error) {
      Notiflix.failure("Incorect email or password");
      return rejectWithValue(error.message);
    }
  }
);
