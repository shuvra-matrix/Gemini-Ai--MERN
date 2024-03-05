import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  user: { username: "", email: "", profileImg: "" },
  location: "",
};

const userSclice = createSlice({
  name: "userSlice",
  initialState: userInitialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload.location;
    },
    setUserData(state, action) {
      state.user = action.payload.user;
    },
  },
});

export const userAction = userSclice.actions;

export default userSclice.reducer;
