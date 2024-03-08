import styles from "./UserIntroPrompt.module.css";
import { commonIcon } from "../../asset";
import { themeIcon } from "../../asset";
import { useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-gemini";

const UserIntroPrompt = () => {
  const dispatch = useDispatch();
  const icon = themeIcon();

  const crossHndler = () => {
    dispatch(uiAction.userIntroPromptHandler({ introPrompt: false }));
  };

  return (
    <div className={styles["intro-main"]}>
      <img src={commonIcon.googleBigIcon} alt="google big"></img>
      <p>
        Experience limitless conversations! <span>Sign in</span> to unlock
        <span> unlimited chat</span> and browse through your entire chat
        history—more than the last 5 interactions.
      </p>
      <div className={styles["cross"]} onClick={crossHndler}>
        <img src={icon.crossIcon} alt="cross"></img>
      </div>
    </div>
  );
};

export default UserIntroPrompt;
