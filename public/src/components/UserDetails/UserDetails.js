import styles from "./UserDetails.module.css";
import { commonIcon } from "../../asset";
import { themeIcon } from "../../asset";
import { uiAction } from "../../store/ui-gemini";
import { useDispatch } from "react-redux";

const UserDetails = () => {
  const dispatch = useDispatch();
  const icon = themeIcon();

  const userDetsilsClose = () => {
    dispatch(uiAction.toggleUserDetailsShow());
  };

  return (
    <div className={styles["user-main"]}>
      <div className={styles["user-data"]}>
        <p className={styles["email"]}>shuvra232@gmail.com</p>
        <img
          className={styles["userIcon"]}
          src={commonIcon.avatarIcon}
          alt="user icon"
        ></img>

        <p className={styles["name"]}>Hi, Shuvra</p>

        <div className={styles["signout"]}>
          <img src={icon.signOutIcon} alt="signout"></img>
          <p>Sign out</p>
        </div>
      </div>
      <div className={styles["privacy"]}>
        <a href="/">
          <p>Privacy Policy</p>
        </a>
        <p>.</p>
        <a href="/">
          <p>Terms of Service</p>
        </a>
      </div>
      <div className={styles["cross"]} onClick={userDetsilsClose}>
        <img src={icon.crossIcon} alt="cross"></img>
      </div>
    </div>
  );
};

export default UserDetails;
