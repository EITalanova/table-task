export const selectIslogin = state => Boolean(state.login.username);
export const selectUser = state => state.login.username;
export const selectToken = state => state.login.token;
