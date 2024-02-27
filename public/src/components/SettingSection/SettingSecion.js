import styles from "./SettingSection.module.css";
import ToggleButton from "./ToggleButton";
import { themeIcon } from "../../asset";
import { useSelector, useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-gemini";

const SettingSection = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.ui.isDark);
  const realTimeMode = useSelector((state) => state.ui.isRealTimeResponse);
  const isSettingsShow = useSelector((state) => state.ui.isSettingsShow);

  const themeHandler = () => {
    dispatch(uiAction.toggleTheme());
  };

  const realTimeResponseHandler = () => {
    dispatch(uiAction.toggleRealTimeResponse());
  };

  const icon = themeIcon();
  const settingShow = isSettingsShow ? "settngs-show" : "settings-hide";
  const getLocalTheme = localStorage.getItem("theme");
  const theme = getLocalTheme || "dark";
  const realTime = localStorage.getItem("realtime");
  const realTimeTheme = realTime === "yes" ? "dark" : "light";

  return (
    <div className={`${styles["setting-main"]} ${styles[settingShow]}`}>
      <div className={styles["title"]}>
        <h4>Settings</h4>
      </div>
      <div className={styles["public-link"]}>
        <img src={icon.linkIcon} alt="link icon"></img>
        <p>Your public links</p>
      </div>
      <div className={styles["theme"]}>
        <img src={icon.moonIcon} alt="moon icon"></img>
        <p>Dark theme</p>
        <ToggleButton theme={theme} onClick={themeHandler} mode={themeMode} />
      </div>
      <div className={styles["real-time"]}>
        <img src={icon.wallIcon} alt="wall icon"></img>
        <p>Real-time responses</p>
        <ToggleButton
          theme={realTimeTheme}
          onClick={realTimeResponseHandler}
          mode={realTimeMode}
        />
      </div>
    </div>
  );
};

export default SettingSection;
