import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./ui-gemini";
import chatReducer from "./chat";
import userReducer from "./user";
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    chat: chatReducer,
    user: userReducer,
    auth: authReducer,
  },
});

export default store;
