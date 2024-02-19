import Header from "../Header/Header";
import InputSection from "../InputSection/InputSection";
import NewChat from "../NewChat/NewChat";
import styles from "./ChatSection.module.css";
import { useSelector, useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-gemini";

const ChatSection = () => {
  const dispatch = useDispatch();
  const settingsShow = useSelector((state) => state.ui.isSettingsShow);

  const settingsHideHandler = () => {
    if (settingsShow === true) {
      dispatch(uiAction.toggleSettings());
    }
  };

  return (
    <div className={styles["chat-section-main"]} onClick={settingsHideHandler}>
      <Header />
      <NewChat />
      <InputSection />
      <div className={styles["warning-text"]}>
        <p>
          Gemini may display inaccurate info, including about people, so
          double-check its responses.
          <span>
            <a href="https://support.google.com/gemini?p=privacy_notice">
              Your privacy & Gemini Apps
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ChatSection;
