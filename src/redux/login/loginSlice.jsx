import { createSlice } from "@reduxjs/toolkit";
import { thunkUser } from "./loginThunks";

const initialState = {
  username: null,
  token: null,
  error: null,
  isLoading: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(thunkUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thunkUser.rejected, (state, { payload }) => {
        // console.log(payload);
        // state.username = payload.user;
        // state.token = payload.token;
        state.isLoading = false;
        state.error = null;
        
      })
      .addCase(thunkUser.fulfilled, (state, { payload }) => {
        state.username = payload; 
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { loginUser } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
