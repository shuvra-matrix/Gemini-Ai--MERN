import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
  isDark: true,
  isSidebarLong: false,
  isRealTimeResponse: false,
  isSettingsShow: false,
};

const uiCreteSlice = createSlice({
  name: "uiSlice",
  initialState: uiInitialState,
  reducers: {
    toggleSideBar(state) {
      state.isSidebarLong = !state.isSidebarLong;
    },
    toggleTheme(state) {
      state.isDark = !state.isDark;
    },
    toggleRealTimeResponse(state) {
      state.isRealTimeResponse = !state.isRealTimeResponse;
    },
    toggleSettings(state) {
      state.isSettingsShow = !state.isSettingsShow;
    },
  },
});

export const uiAction = uiCreteSlice.actions;

export default uiCreteSlice.reducer;
