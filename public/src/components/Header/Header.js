import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/ui-gemini";
import { themeIcon } from "../../asset";
import { commonIcon } from "../../asset";
import { useNavigate } from "react-router-dom";
import { chatAction } from "../../store/chat";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNewChat = useSelector((state) => state.chat.newChat);
  const toggleSideBarHandler = () => {
    dispatch(uiAction.toggleSideBar());
  };

  const toggleAadvanceGeminiHandler = () => {
    dispatch(uiAction.toggleAdvanceShow());
  };

  const icon = themeIcon();

  const newChatHandler = () => {
    dispatch(chatAction.replaceChat({ chats: [] }));
    dispatch(chatAction.newChatHandler());
    dispatch(chatAction.chatHistoryIdHandler({ chatHistoryId: "" }));
    navigate("/");
  };

  const userDetailsOpen = () => {
    dispatch(uiAction.toggleUserDetailsShow());
  };

  return (
    <div className={styles["header-main"]}>
      <div className={styles["left-section"]}>
        <div className={styles["menu-icon"]} onClick={toggleSideBarHandler}>
          <img src={icon.menuIcon} alt="menu icon"></img>
        </div>
        <div className={styles["name"]} onClick={toggleAadvanceGeminiHandler}>
          <p>Gemini</p>
          <img src={icon.dropIconSmall} alt="drop down button"></img>
        </div>
      </div>
      <div className={styles["right-section"]}>
        {isNewChat ? (
          <div
            onClick={newChatHandler}
            className={`${styles["plus-icon"]} ${styles["new-plus-icon"]}`}
          >
            <img src={icon.plusIcon} alt="plus icon"></img>
          </div>
        ) : null}
        <div className={styles["login"]}>
          <img src={commonIcon.googleLogo} alt="google logo"></img>
          <p>Sign In</p>
        </div>
        <div onClick={userDetailsOpen} className={styles["user"]}>
          <img src={commonIcon.avatarIcon} alt="avatar icon"></img>
        </div>
      </div>
    </div>
  );
};

export default Header;
