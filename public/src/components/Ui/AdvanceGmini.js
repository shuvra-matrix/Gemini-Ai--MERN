import styles from "./AdvanceGemini.module.css";
import { commonIcon } from "../../asset";
import okIcon from "../../asset/icons8-ok-64.png";

import { useSelector } from "react-redux";

const AdvanceGemini = () => {
  const isAdvanceGeminiPrompt = useSelector((state) => state.ui.isAdvanceShow);

  const advanceClass = isAdvanceGeminiPrompt ? "advance-on" : "advance-off";

  return (
    <div className={`${styles["advance-main"]} ${styles[advanceClass]}`}>
      <h4>Model</h4>

      <div className={styles["gemini"]}>
        <img src={commonIcon.geminiIcon} alt="gemini icon"></img>
        <p>Gemini</p>
        <img src={okIcon} alt="ok icon"></img>
      </div>
      <div className={styles["advance-gemini"]}>
        <img src={commonIcon.advanceGeminiIcon} alt="advance gemini"></img>
        <p>Gemini Advance</p>
        <button>Upgrade</button>
      </div>
    </div>
  );
};

export default AdvanceGemini;
