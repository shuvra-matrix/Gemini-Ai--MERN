import "./App.css";
import ChatSection from "./components/ChatSection/ChatSection";
import SettingSection from "./components/SettingSection/SettingSecion";
import Sidebar from "./components/Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { uiAction } from "./store/ui-gemini";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const settingsShow = useSelector((state) => state.ui.isSettingsShow);
  const isAdvanceGeminiPrompt = useSelector((state) => state.ui.isAdvanceShow);
  const isDark = useSelector((state) => state.ui.isDark);
  const settingHandler = () => {
    if (settingsShow === true) {
      dispatch(uiAction.toggleSettings());
    }
    if (isAdvanceGeminiPrompt === true) {
      dispatch(uiAction.toggleAdvanceShow());
    }
  };

  useEffect(() => {
    const getLocalTheme = localStorage.getItem("theme");
    console.log(getLocalTheme);
    const theme = getLocalTheme || "dark";
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDark]);

  return (
    <div className="App">
      <Sidebar />
      <ChatSection />
      <SettingSection />

      {settingsShow && (
        <div onClick={settingHandler} className="bg-focus-dark"></div>
      )}
      {isAdvanceGeminiPrompt && (
        <div onClick={settingHandler} className="bg-focus-dark"></div>
      )}
    </div>
  );
}

export default App;
