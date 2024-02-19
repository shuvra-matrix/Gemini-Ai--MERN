import styles from "./Header.module.css";
import dropDownIcon from "../../asset/icons8-drop-down-50.png";
import plusIcon from "../../asset/icons8-plus-50.png";
import menuIcon from "../../asset/icons8-menu-64.png";

const Header = () => {
  return (
    <div className={styles["header-main"]}>
      <div className={styles["left-section"]}>
        <div className={styles["menu-icon"]}>
          <img src={menuIcon} alt="menu icon"></img>
        </div>
        <div className={styles["name"]}>
          <p>Gemimi</p>
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
