import "./App.css";
import ChatSection from "./components/ChatSection/ChatSection";
import SettingSection from "./components/SettingSection/SettingSecion";
import Sidebar from "./components/Sidebar/Sidebar";
import { useSelector } from "react-redux";

function App() {
  const settingsShow = useSelector((state) => state.ui.isSettingsShow);

  return (
    <div className="App">
      <Sidebar />
      <ChatSection />
      <SettingSection />
    </div>
  );
}

export default App;
