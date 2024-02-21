import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./ui-gemini";
import chatReducer from "./chat";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    chat: chatReducer,
  },
});

export default store;
