import styles from "./Header.module.css";
import dropDownIcon from "../../asset/icons8-drop-down-50.png";
import plusIcon from "../../asset/icons8-plus-50.png";
import menuIcon from "../../asset/icons8-menu-64.png";
import { useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-gemini";

const Header = () => {
  const dispatch = useDispatch();

  const toggleSideBarHandler = () => {
    dispatch(uiAction.toggleSideBar());
  };

  const toggleAadvanceGeminiHandler = () => {
    dispatch(uiAction.toggleAdvanceShow());
  };

  return (
    <div className={styles["header-main"]}>
      <div className={styles["left-section"]}>
        <div className={styles["menu-icon"]} onClick={toggleSideBarHandler}>
          <img src={menuIcon} alt="menu icon"></img>
        </div>
        <div className={styles["name"]} onClick={toggleAadvanceGeminiHandler}>
          <p>Gemini</p>
          <img src={dropDownIcon} alt="drop down button"></img>
        </div>
      </div>
      <div className={styles["right-section"]}>
        <div className={styles["plus-icon"]}>
          <img src={plusIcon} alt="plus icon"></img>
        </div>
        <div className={styles["user"]}></div>
      </div>
    </div>
  );
};

export default Header;
