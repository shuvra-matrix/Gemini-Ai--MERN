import styles from "./SettingSection.module.css";
import wallIcon from "../../asset/icons8-wall-64.png";
import moonIcon from "../../asset/icons8-moon-64.png";
import linkIcon from "../../asset/icons8-link-64.png";
import ToggleButton from "./ToggleButton";
import { useSelector, useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-gemini";

const SettingSection = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.ui.isDark);
  const realTimeMode = useSelector((state) => state.ui.isRealTimeResponse);

  const themeHandler = () => {
    dispatch(uiAction.toggleTheme());
  };

  const realTimeResponseHandler = () => {
    dispatch(uiAction.toggleRealTimeResponse());
  };

  return (
    <div className={styles["setting-main"]}>
      <div className={styles["title"]}>
        <h4>Settings</h4>
      </div>
      <div className={styles["public-link"]}>
        <img src={linkIcon} alt="link icon"></img>
        <p>Your public links</p>
      </div>
      <div className={styles["theme"]}>
        <img src={moonIcon} alt="moon icon"></img>
        <p>Dark theme</p>
        <ToggleButton onClick={themeHandler} mode={themeMode} />
      </div>
      <div className={styles["real-time"]}>
        <img src={wallIcon} alt="wall icon"></img>
        <p>Real-time responses</p>
        <ToggleButton onClick={realTimeResponseHandler} mode={realTimeMode} />
      </div>
    </div>
  );
};

export default SettingSection;
