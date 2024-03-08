import "./App.css";
import ChatSection from "./components/ChatSection/ChatSection";
import SettingSection from "./components/SettingSection/SettingSecion";
import Sidebar from "./components/Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { uiAction } from "./store/ui-gemini";
import { useEffect } from "react";
import { getRecentChat } from "./store/chat-action";
import UserDetails from "./components/UserDetails/UserDetails";
import { refreshToken } from "./store/auth-action";
import { loginHandler } from "./store/auth-action";
import UserIntroPrompt from "./components/UserIntroPrompt/UserIntroPrompt";

function App() {
  const dispatch = useDispatch();
  const settingsShow = useSelector((state) => state.ui.isSettingsShow);
  const isAdvanceGeminiPrompt = useSelector((state) => state.ui.isAdvanceShow);
  const newChat = useSelector((state) => state.chat.newChat);
  const isDark = useSelector((state) => state.ui.isDark);
  const isUserDetails = useSelector((state) => state.ui.isUserDetailsShow);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const isIntroPrompt = useSelector((state) => state.ui.showIntroUserPrompt);

  const settingHandler = () => {
    if (settingsShow === true) {
      dispatch(uiAction.toggleSettings());
    }
    if (isAdvanceGeminiPrompt === true) {
      dispatch(uiAction.toggleAdvanceShow());
    }

    if (isUserDetails === true) {
      dispatch(uiAction.toggleUserDetailsShow());
    }
  };

  useEffect(() => {
    const getLocalTheme = localStorage.getItem("theme");
    const theme = getLocalTheme || "dark";
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDark]);

  useEffect(() => {
    if (newChat === false) {
      dispatch(getRecentChat());
    }
  }, [dispatch, newChat]);

  useEffect(() => {
    dispatch(loginHandler());
  }, [dispatch]);

  useEffect(() => {
    const showUserPrompt = setInterval(() => {
      const isShowIntroAlready = localStorage.getItem("isIntroShow") || false;
      if (!isShowIntroAlready) {
        dispatch(uiAction.userIntroPromptHandler({ introPrompt: true }));
        localStorage.setItem("isIntroShow", true);
      }
    }, 2 * 1000);

    return () => clearInterval(showUserPrompt);
  }, [dispatch]);

  useEffect(() => {
    const refreshTokenHandler = setInterval(() => {
      const isLoginLocal = localStorage.getItem("isLogin");
      if (isLoginLocal) {
        dispatch(refreshToken());
      }
    }, 14 * 60 * 1000);

    return () => clearInterval(refreshTokenHandler);
  }, [dispatch]);

  return (
    <div className="App">
      <Sidebar />
      <ChatSection />
      <SettingSection />
      {isUserDetails && isLogin && <UserDetails />}
      {!isLogin && isIntroPrompt && <UserIntroPrompt />}
      {settingsShow && (
        <div onClick={settingHandler} className="bg-focus-dark"></div>
      )}
      {isAdvanceGeminiPrompt && (
        <div onClick={settingHandler} className="bg-focus-dark"></div>
      )}
      {isUserDetails && isLogin && (
        <div onClick={settingHandler} className="bg-focus-dark"></div>
      )}
    </div>
  );
}

export default App;
