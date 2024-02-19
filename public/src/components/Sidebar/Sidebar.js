import styles from "./Sidebar.module.css";
import menuIcon from "../../asset/icons8-menu-64.png";
import plusIcon from "../../asset/icons8-plus-50.png";
import messageIcon from "../../asset/icons8-message-48.png";
import expandIcon from "../../asset/icons8-expand-arrow-64.png";
import threeDotIcon from "../../asset/icons8-menu-vertical-30.png";
import helpIcon from "../../asset/icons8-help-50.png";
import activityIcon from "../../asset/icons8-activity-48.png";
import settingsIcon from "../../asset/icons8-settings-64.png";
import geminiLogo from "../../asset/gemini_sparkle_red_4ed1cbfcbc6c9e84c31b987da73fc4168aec8445.svg";
import dotIcon from "../../asset/icons8-dot-30.png";
import upArrowIcon from "../../asset/icons8-collapse-arrow-64.png";
import { useSelector, useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-gemini";
import { useState } from "react";

const recentChat = [
  {
    id: 1,
    chat: "I need more context",
  },
  {
    id: 2,
    chat: "I need more context how i get",
  },
  {
    id: 3,
    chat: "I need more context",
  },
  {
    id: 4,
    chat: "I need more context",
  },
  {
    id: 5,
    chat: "I need more context",
  },
  {
    id: 6,
    chat: "I need more context",
  },
  {
    id: 7,
    chat: "I need more context how i get",
  },
  {
    id: 8,
    chat: "I need more context",
  },
  {
    id: 9,
    chat: "I need more context",
  },
  {
    id: 10,
    chat: "I need more context",
  },
  {
    id: 11,
    chat: "I need more context",
  },
  {
    id: 12,
    chat: "I need more context how i get",
  },
  {
    id: 13,
    chat: "I need more context",
  },
  {
    id: 14,
    chat: "I need more context",
  },
  {
    id: 15,
    chat: "I need more context",
  },
  {
    id: 16,
    chat: "I need more context",
  },
  {
    id: 17,
    chat: "I need more context how i get",
  },
  {
    id: 18,
    chat: "I need more context",
  },
  {
    id: 19,
    chat: "I need more context",
  },
  {
    id: 20,
    chat: "I need more context",
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarLong = useSelector((state) => state.ui.isSidebarLong);
  const [isShowMore, setisShowMore] = useState(false);

  const sideBarWidthHandler = () => {
    dispatch(uiAction.toggleSideBar());
  };

  const showMoreHandler = () => {
    setisShowMore((pre) => !pre);
  };

  const sideBarWidthClass = isSidebarLong ? "side-bar-long" : "side-bar-sort";
  const showMoreArrowIcon = isShowMore ? upArrowIcon : expandIcon;

  return (
    <div className={`${styles["sidebar-main"]} ${styles[sideBarWidthClass]}`}>
      <div className={styles["menu-icon"]}>
        <img onClick={sideBarWidthHandler} src={menuIcon} alt="menu icon"></img>
      </div>

      <div className={styles["recent-chat-section"]}>
        <div className={styles["pluc-icon"]}>
          <img src={plusIcon} alt="plus icon"></img>
          {isSidebarLong && <p>New chat</p>}
        </div>
        {isSidebarLong && (
          <div className={styles["recent-chat-main"]}>
            <p>Recent</p>

            {recentChat.slice(0, 5).map((chat) => (
              <div className={styles["recent-chat"]} key={chat.id}>
                <img src={messageIcon} alt="message"></img>
                <p>{chat.chat.slice(0, 20)}</p>
                <div className={styles["three-dot"]}>
                  <img src={threeDotIcon} alt="more-option"></img>
                </div>
              </div>
            ))}
            {recentChat.length > 5 && (
              <div className={styles["show-more"]} onClick={showMoreHandler}>
                <img src={showMoreArrowIcon} alt="drop down"></img>
                <p>Show more</p>
              </div>
            )}

            {isShowMore &&
              recentChat.slice(5, recentChat.length).map((chat) => (
                <div className={styles["recent-chat"]} key={chat.id}>
                  <img src={messageIcon} alt="message"></img>
                  <p>{chat.chat.slice(0, 20)}</p>
                  <div className={styles["three-dot"]}>
                    <img src={threeDotIcon} alt="more-option"></img>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className={styles["settings-section"]}>
        <div className={styles["help"]}>
          <img src={helpIcon} alt="help icon"></img>
          {isSidebarLong && <p>Help</p>}
        </div>
        <div className={styles["activity"]}>
          <img src={activityIcon} alt="activity icon"></img>
          {isSidebarLong && <p>Activity</p>}
        </div>
        <div className={styles["settings"]}>
          <img src={settingsIcon} alt="settings icon"></img>
          {isSidebarLong && <p>Settings</p>}
        </div>
        {isSidebarLong && (
          <div className={styles["upgrade-gimini"]}>
            <img src={geminiLogo} alt="gemini-logo"></img>
            <p>Upgrade to Gemini Advanced</p>
          </div>
        )}
        <div className={styles["location"]}>
          <div className={styles["dot"]}>
            <img src={dotIcon} alt="dot icon"></img>
          </div>
          <p>
            <span className={styles["location-name"]}>
              Kolkata, Westbengal, India
            </span>{" "}
            From your IP address <span className={styles["span-dot"]}>.</span>
            <span> Update location</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
