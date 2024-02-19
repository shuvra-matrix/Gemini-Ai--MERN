import "./App.css";
import ChatSection from "./components/ChatSection/ChatSection";
import SettingSection from "./components/SettingSection/SettingSecion";
import Sidebar from "./components/Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { uiAction } from "./store/ui-gemini";

function App() {
  const dispatch = useDispatch();
  const settingsShow = useSelector((state) => state.ui.isSettingsShow);

  const settingHandler = () => {
    dispatch(uiAction.toggleSettings());
  };

  return (
    <div className="App">
      <Sidebar />
      <ChatSection />
      <SettingSection />
      {settingsShow && (
        <div onClick={settingHandler} className="bg-focus-dark"></div>
      )}
    </div>
  );
}

export default App;
