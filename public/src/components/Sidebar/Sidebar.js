import styles from "./Sidebar.module.css";
import menuIcon from "../../asset/icons8-menu-64.png";
import plusIcon from "../../asset/icons8-plus-50.png";
import messageIcon from "../../asset/icons8-message-48.png";
import expandIcon from "../../asset/icons8-expand-arrow-64.png";
import threeDotIcon from "../../asset/icons8-menu-vertical-30.png";
import helpIcon from "../../asset/icons8-help-50.png";
import activityIcon from "../../asset/icons8-activity-48.png";
import settingsIcon from "../../asset/icons8-settings-64.png";
import geminiLogo from "../../asset/gemini_advanced_slap_logo_d55053ceb94d1a82d2fa11e831e4c68f.svg";
import dotIcon from "../../asset/icons8-dot-30.png";
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
];

const Sidebar = () => {
  const [isSideBarLong, setSideBarLong] = useState(false);

  const sideBarWidthHandler = () => {
    setSideBarLong((pre) => !pre);
  };

  const sideBarWidthClass = isSideBarLong ? "side-bar-long" : "side-bar-sort";

  return (
    <div className={`${styles["sidebar-main"]} ${styles[sideBarWidthClass]}`}>
      <div className={styles["menu-icon"]}>
        <img onClick={sideBarWidthHandler} src={menuIcon} alt="menu icon"></img>
      </div>

      <div className={styles["recent-chat-section"]}>
        <div className={styles["pluc-icon"]}>
          <img src={plusIcon} alt="plus icon"></img>
          {isSideBarLong && <p>New chat</p>}
        </div>
        {isSideBarLong && (
          <div className={styles["recent-chat-main"]}>
            <p>Recent</p>

            {recentChat.map((chat) => (
              <div className={styles["recent-chat"]} key={chat.id}>
                <img src={messageIcon} alt="message"></img>
                <p>{chat.chat.slice(0, 20)}</p>
                <div className={styles["three-dot"]}>
                  <img src={threeDotIcon} alt="more-option"></img>
                </div>
              </div>
            ))}

            <div className={styles["show-more"]}>
              <img src={expandIcon} alt="drop down"></img>
              <p>Show more</p>
            </div>
          </div>
        )}
      </div>

      <div className={styles["settings-section"]}>
        <div className={styles["help"]}>
          <img src={helpIcon} alt="help icon"></img>
          {isSideBarLong && <p>Help</p>}
        </div>
        <div className={styles["activity"]}>
          <img src={activityIcon} alt="activity icon"></img>
          {isSideBarLong && <p>Activity</p>}
        </div>
        <div className={styles["settings"]}>
          <img src={settingsIcon} alt="settings icon"></img>
          {isSideBarLong && <p>Settings</p>}
        </div>
        {isSideBarLong && (
          <div className={styles["upgrade-gimini"]}>
            <img src={geminiLogo} alt="gemini-logo"></img>
            <p>Upgrade to Gemini Advanced</p>
          </div>
        )}
        {isSideBarLong && (
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
        )}
      </div>
    </div>
  );
};

export default Sidebar;
