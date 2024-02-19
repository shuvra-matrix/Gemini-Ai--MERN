import Header from "../Header/Header";
import InputSection from "../InputSection/InputSection";
import NewChat from "../NewChat/NewChat";
import AdvanceGemini from "../Ui/AdvanceGmini";

import styles from "./ChatSection.module.css";

const ChatSection = () => {
  return (
    <div className={styles["chat-section-main"]}>
      <Header />
      <AdvanceGemini />
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
