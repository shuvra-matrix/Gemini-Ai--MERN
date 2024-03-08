import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
  isDark: true,
  isSidebarLong: false,
  isRealTimeResponse: false,
  isSettingsShow: false,
  isAdvanceShow: false,
  isUserDetailsShow: false,
  showIntroUserPrompt: false,
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
      const theme = state.isDark ? "dark" : "light";
      localStorage.setItem("theme", theme);
    },
    toggleRealTimeResponse(state) {
      state.isRealTimeResponse = !state.isRealTimeResponse;
      const realtime = state.isRealTimeResponse ? "yes" : "no";
      localStorage.setItem("realtime", realtime);
    },
    toggleSettings(state) {
      state.isSettingsShow = !state.isSettingsShow;
    },
    toggleAdvanceShow(state) {
      state.isAdvanceShow = !state.isAdvanceShow;
    },
    toggleUserDetailsShow(state) {
      state.isUserDetailsShow = !state.isUserDetailsShow;
    },
    userIntroPromptHandler(state, action) {
      state.showIntroUserPrompt = action.payload.introPrompt;
    },
  },
});

export const uiAction = uiCreteSlice.actions;

export default uiCreteSlice.reducer;
