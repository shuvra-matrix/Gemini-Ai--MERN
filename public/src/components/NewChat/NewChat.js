import styles from "./NewChat.module.css";
import PromptSection from "./PromptSection/PromptSection";
import { useSelector, useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-gemini";

const NewChat = () => {
  const dispatch = useDispatch();
  const isSideBarLong = useSelector((state) => state.ui.isSidebarLong);
  const userDetails = useSelector((state) => state.user.user);

  const sideBarCloseHandler = () => {
    if (isSideBarLong === true) {
      dispatch(uiAction.toggleSideBar());
    }
  };
  return (
    <div className={styles["newchat-main"]} onClick={sideBarCloseHandler}>
      <div className={styles["text-section"]}>
        <h1>Hello, {userDetails?.name.split(" ")[0]}.</h1>
        <h2>How can I help you today?</h2>
      </div>
      <PromptSection />
    </div>
  );
};

export default NewChat;
