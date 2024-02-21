import { createSlice } from "@reduxjs/toolkit";

const inittalState = {
  chats: [],
  newChat: false,
  isLoader: false,
  recentChat: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState: inittalState,
  reducers: {
    loaderHandler(state) {
      state.isLoader = !state.isLoader;
    },
    newChatHandler(state) {
      state.chats.length > 0 ? (state.newChat = true) : (state.newChat = false);
    },
    replaceChat(state, action) {
      state.chats = action.payload.chats;
    },
    replaceRecentChat(state, action) {
      state.recentChat = action.payload.recentChat;
    },
    chatStart(state, action) {
      state.chats.push({
        user: action.payload.useInput.query,
        isLoader: action.payload.useInput.isLoader,
        gemini: "",
      });
    },
  },
});

export const chatAction = chatSlice.actions;

export default chatSlice.reducer;
