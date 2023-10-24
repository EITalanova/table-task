import Notiflix from "notiflix";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  error: null,
  users: [{ id: 1, login: "testuser", password: "testpassword123" }],
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { login, password } = action.payload;
      console.log(login);
      console.log(password);
      console.log(state.user);
      const matchingUser = state.users.find(
        (user) => user.login === login && user.password === password
      );
      console.log(matchingUser);
      if (matchingUser) {
        state.user = matchingUser;
        state.error = null;
      } else {
        state.user = null;
      }
      console.log(state.user);
    },
  },
});

export const { loginUser } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
