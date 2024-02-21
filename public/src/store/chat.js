import { createSlice } from "@reduxjs/toolkit";

const inittalState = {
  chats: [
    {
      id: 1,
      user: "how make this text animation hello shuvra in your app",
      gemini: `While I am always happy to help, unfortunately, there is not enough information in "gdfgdgdg" for me to provide a meaningful response. It seems like a random sequence of letters without any specific context or intention.

However, if you are trying to communicate something specific, please rephrase your request or provide more context. The more information you give me, the better I can understand your needs and assist you.

For example, you could:

Ask a question using clear and complete sentences.
Describe what you are trying to achieve.
Give me a specific topic to search for on the web.
Provide additional information about "gdfgdgdg" to help me understand its meaning.
I am here to help in any way I can, so please don't hesitate to be more specific!`,
    },
  ],
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
      state.newChat = !state.newChat;
    },
    replaceChat(state, action) {
      state.chats = action.payload.chats;
    },
    replaceRecentChat(state, action) {
      state.recentChat = action.payload.recentChat;
    },
    chatStart(state, action) {
      state.chats.push({
        user: action.payload.useInput,
        gemini: "",
      });
    },
  },
});

export const chatAction = chatSlice.actions;

export default chatSlice.reducer;
