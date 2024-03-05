import { authAction } from "./auth";

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
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
