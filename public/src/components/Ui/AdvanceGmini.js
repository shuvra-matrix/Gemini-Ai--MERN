import styles from "./AdvanceGemini.module.css";
import { commonIcon } from "../../asset";
import { themeIcon } from "../../asset";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { chatAction } from "../../store/chat";

const AdvanceGemini = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdvanceGeminiPrompt = useSelector((state) => state.ui.isAdvanceShow);
  const advanceClass = isAdvanceGeminiPrompt ? "advance-on" : "advance-off";

  const icon = themeIcon();

  const newChatHandler = () => {
    dispatch(chatAction.replaceChat({ chats: [] }));
    dispatch(chatAction.newChatHandler());
    navigate("/");
  };

  return (
    <div className={`${styles["advance-main"]} ${styles[advanceClass]}`}>
      <h4>Model</h4>

      <div className={styles["gemini"]} onClick={newChatHandler}>
        <img src={commonIcon.geminiIcon} alt="gemini icon"></img>
        <p>Gemini</p>
        <img src={icon.okIcon} alt="ok icon"></img>
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
