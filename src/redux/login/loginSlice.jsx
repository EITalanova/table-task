import Notiflix from 'notiflix';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  users: [{ id: 1, username: "testuser", password: "testpassword123" }],
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { username, password } = action.payload;
      const matchingUser = state.users.find(
        (user) => user.username === username && user.password === password
      );

      if (matchingUser) {
        state.user = matchingUser;
        console.log(state.user);
        state.error = null;
      } else {
        state.user = null;
        // Notiflix.Notify.failure('Login or password does not exist 🥲 Try again');
      }
    },
  },
});

export const { loginUser } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
