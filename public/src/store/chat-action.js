import { chatAction } from "./chat";

export const getRecentChat = () => {};

export const sendChatData = (useInput) => {
  return (dispatch) => {
    dispatch(chatAction.loaderHandler());
    dispatch(chatAction.newChatHandler());
    dispatch(chatAction.chatStart({ useInput: useInput }));
  };
};
