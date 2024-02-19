import styles from "./AdvanceGemini.module.css";
import advanceIcon from "../../asset/gemini_sparkle_red_4ed1cbfcbc6c9e84c31b987da73fc4168aec8445.svg";
import geminiIcon from "../../asset/gemini_sparkle_blue_33c17e77c4ebbdd9490b683b9812247e257b6f70.svg";
import okIcon from "../../asset/icons8-ok-64.png";

import { useSelector } from "react-redux";

const AdvanceGemini = () => {
  const isAdvanceGeminiPrompt = useSelector((state) => state.ui.isAdvanceShow);

  const advanceClass = isAdvanceGeminiPrompt ? "advance-on" : "advance-off";

  return (
    <div className={`${styles["advance-main"]} ${styles[advanceClass]}`}>
      <h4>Model</h4>

      <div className={styles["gemini"]}>
        <img src={geminiIcon} alt="gemini icon"></img>
        <p>Gemini</p>
        <img src={okIcon} alt="ok icon"></img>
      </div>
      <div className={styles["advance-gemini"]}>
        <img src={advanceIcon} alt="advance gemini"></img>
        <p>Gemini Advance</p>
        <button>Upgrade</button>
      </div>
    </div>
  );
};

export default AdvanceGemini;
