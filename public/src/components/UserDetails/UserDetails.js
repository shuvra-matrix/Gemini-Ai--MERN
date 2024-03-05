import styles from "./UserDetails.module.css";
import { themeIcon } from "../../asset";
import { uiAction } from "../../store/ui-gemini";
import { useDispatch, useSelector } from "react-redux";
import { logoutHandler } from "../../store/auth-action";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.user);
  const icon = themeIcon();

  const userDetsilsClose = () => {
    dispatch(uiAction.toggleUserDetailsShow());
  };

  const onLogoutHandler = () => {
    dispatch(logoutHandler());
    navigate("/");
  };

  return (
    <div className={styles["user-main"]}>
      <div className={styles["user-data"]}>
        <p className={styles["email"]}>{userDetails?.email}</p>
        <img
          className={styles["userIcon"]}
          src={userDetails?.profileImg}
          alt="user icon"
        ></img>

        <p className={styles["name"]}>Hi, {userDetails?.name.split(" ")[0]}</p>

        <div className={styles["signout"]} onClick={onLogoutHandler}>
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
