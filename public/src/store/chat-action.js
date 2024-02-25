import { chatAction } from "./chat";

export const getRecentChat = () => {
  return (dispatch) => {
    const url = "http://localhost:3030/gemini/api/getchathistory";

    fetch(url, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("server error");
        }

        return response.json();
      })
      .then((data) => {
        dispatch(
          chatAction.recentChatHandler({ recentChat: data.chatHistory })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const sendChatData = (useInput) => {
  return (dispatch) => {
    dispatch(chatAction.loaderHandler());
    dispatch(chatAction.chatStart({ useInput: useInput }));

    const url = "http://localhost:3030/gemini/api/chat";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userInput: useInput.user,
        previousChat: useInput.previousChat,
        chatHistoryId: useInput.chatHistoryId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          const error = new Error("Server Error");
          throw error;
        }

        return response.json();
      })
      .then((data) => {
        dispatch(
          chatAction.previousChatHandler({
            previousChat: [
              { role: "user", parts: data.user },
              { role: "model", parts: data.gemini },
            ],
          })
        );

        dispatch(chatAction.popChat());

        dispatch(
          chatAction.chatStart({
            useInput: {
              user: data.user,
              gemini: data.gemini,
              isLoader: "no",
            },
          })
        );
        dispatch(chatAction.loaderHandler());
        dispatch(getRecentChat());
        dispatch(chatAction.newChatHandler());
        dispatch(
          chatAction.chatHistoryIdHandler({ chatHistoryId: data.chatHistoryId })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(chatAction.loaderHandler());
        dispatch(chatAction.newChatHandler());
      });
  };
};
