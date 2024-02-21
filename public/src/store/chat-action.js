import { chatAction } from "./chat";

export const getRecentChat = () => {};

export const sendChatData = (useInput) => {
  return (dispatch) => {
    dispatch(chatAction.chatStart({ useInput: useInput }));
    dispatch(chatAction.loaderHandler());
    dispatch(chatAction.newChatHandler());
  };
};
