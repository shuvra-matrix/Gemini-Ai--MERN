import { createSlice } from "@reduxjs/toolkit";

const authInitialState = { isLogin: false };

const authSlice = createSlice({
  name: "auth slice",
  initialState: authInitialState,
  reducers: {
    loginHandler(state) {
      state.isLogin = !state.isLogin;
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
