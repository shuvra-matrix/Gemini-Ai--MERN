import styles from "./ScrollChat.module.css";
import { commonIcon } from "../../../asset";
import { useSelector } from "react-redux";
const ScrollChat = () => {
  const chat = useSelector((state) => state.chat.chats);
  const isLoader = useSelector((state) => state.chat.isLoader);

  const chatSection = chat.map((c) => (
    <div className={styles["single-chat"]} key={c.id}>
      <div className={styles["user"]}>
        <img src={commonIcon.avatarIcon} alt="avater icon"></img>
        <p>{c.user}</p>
      </div>
      <div className={styles["gemini"]}>
        {isLoader && c?.isLoader === "yes" && (
          <img src={commonIcon.geminiLaoder} alt="avater icon"></img>
        )}
        {!isLoader && (
          <img src={commonIcon.chatGeminiIcon} alt="avater icon"></img>
        )}
        <p>{c.gemini}</p>
      </div>
    </div>
  ));

  return <div className={styles["scroll-chat-main"]}>{chatSection}</div>;
};

export default ScrollChat;
