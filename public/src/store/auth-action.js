import { authAction } from "./auth";
import { userAction } from "./user";
import { chatAction } from "./chat";

const SERVER_ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT;

export const loginHandler = () => {
  return (dispatch) => {
    const url = `${SERVER_ENDPOINT}/api/auth/login`;

    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid Credential");
        }

        return response.json();
      })
      .then((data) => {
        dispatch(
          userAction.setUserData({
            userData: {
              name: data.name,
              email: data.email,
              profileImg: data.profileImg,
            },
          })
        );
        dispatch(authAction.isLoginHandler({ isLogin: true }));
        localStorage.setItem("isLogin", true);
      })
      .catch((err) => {
        console.log(err);
        dispatch(authAction.isLoginHandler({ isLogin: false }));
        localStorage.removeItem("isLogin");
        localStorage.removeItem("loginCheck");
      });
  };
};

export const logoutHandler = () => {
  return (dispatch) => {
    const url = `${SERVER_ENDPOINT}/api/auth/logout`;

    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid Credential");
        }
        dispatch(authAction.isLoginHandler({ isLogin: false }));
        localStorage.removeItem("isLogin");
        localStorage.removeItem("loginCheck");
        dispatch(chatAction.replaceChat({ chats: [] }));
        dispatch(chatAction.recentChatHandler({ recentChat: [] }));
        dispatch(chatAction.replacePreviousChat({ previousChat: [] }));
        dispatch(chatAction.chatHistoryIdHandler({ chatHistoryId: "" }));
        dispatch(chatAction.newChatHandler());
        dispatch(
          userAction.setUserData({
            userData: {
              name: "User",
              email: "",
              profileImg: "",
            },
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const refreshToken = () => {
  return (dispatch) => {
    const url = `${SERVER_ENDPOINT}/api/auth/resetToken`;

    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid Credential");
        }
        localStorage.setItem("isLogin", true);
      })
      .catch((err) => {
        console.log(err);
        dispatch(logoutHandler());
      });
  };
};
