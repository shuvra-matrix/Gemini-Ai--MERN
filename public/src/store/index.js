import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./ui-gemini";

const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
});

export default store;
