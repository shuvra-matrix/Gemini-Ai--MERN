import { chatAction } from "./chat";

export const getRecentChat = () => {};

export const sendChatData = (useInput) => {
  return (dispatch) => {
    dispatch(chatAction.loaderHandler());

    dispatch(chatAction.chatStart({ useInput: useInput }));

    const url = "http://localhost:3030/gemini/api";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userInput: useInput.user,
        previousChat: useInput.previousChat,
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
        dispatch(chatAction.newChatHandler());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
