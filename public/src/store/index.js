import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./ui-gemini";
import chatReducer from "./chat";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    chat: chatReducer,
    user: userReducer,
  },
});

export default store;
