import styles from "./Header.module.css";
import { useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-gemini";
import { themeIcon } from "../../asset";

const Header = () => {
  const dispatch = useDispatch();
  const toggleSideBarHandler = () => {
    dispatch(uiAction.toggleSideBar());
  };

  const toggleAadvanceGeminiHandler = () => {
    dispatch(uiAction.toggleAdvanceShow());
  };

  const icon = themeIcon();

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
        <div className={styles["plus-icon"]}>
          <img src={icon.plusIcon} alt="plus icon"></img>
        </div>
        <div className={styles["user"]}></div>
      </div>
    </div>
  );
};

export default Header;
