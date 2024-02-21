import styles from "./ScrollChat.module.css";
import { commonIcon } from "../../../asset";
import { useSelector } from "react-redux";
const ScrollChat = () => {
  const chat = useSelector((state) => state.chat.chats);

  const chatSection = chat.map((c) => (
    <div className={styles["single-chat"]} key={c.id}>
      <div className={styles["user"]}>
        <img src={commonIcon.avatarIcon} alt="avater icon"></img>
        <p>{c.user}</p>
      </div>
      <div className={styles["gemini"]}>
        <img src={commonIcon.chatGeminiIcon} alt="gemini icon"></img>
        <p>{c.gemini}</p>
      </div>
    </div>
  ));

  return <div className={styles["scroll-chat-main"]}>{chatSection}</div>;
};

export default ScrollChat;
