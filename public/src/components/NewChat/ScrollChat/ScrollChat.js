import styles from "./ScrollChat.module.css";
import { commonIcon } from "../../../asset";
import { useSelector } from "react-redux";
import React, { useRef, useEffect } from "react";
import DOMPurify from "dompurify";
import { useNavigate, useParams } from "react-router-dom";

const ScrollChat = () => {
  const navigate = useNavigate();
  const { historyId } = useParams();

  const chatRef = useRef(null);
  const chat = useSelector((state) => state.chat.chats);
  const isLoader = useSelector((state) => state.chat.isLoader);
  const chatHistoryId = useSelector((state) => state.chat.chatHistoryId);

  console.log(historyId);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = 0;
    }
    navigate(`/app/${chatHistoryId}`);
  }, [chat, chatHistoryId, navigate]);

  const chatSection = chat.map((c) => (
    <div className={styles["single-chat"]} ref={chatRef} key={c.id}>
      <div className={styles["user"]}>
        <img src={commonIcon.avatarIcon} alt="avater icon"></img>
        <p>{c.user}</p>
      </div>
      <div className={styles["gemini"]}>
        {isLoader && c?.isLoader === "yes" && (
          <img src={commonIcon.geminiLaoder} alt="avater icon"></img>
        )}
        {c?.isLoader === "no" && (
          <img src={commonIcon.chatGeminiIcon} alt="avater icon"></img>
        )}
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(c?.gemini?.replace(/\n/g, "<br>")),
          }}
        />
      </div>
    </div>
  ));

  return (
    <div className={styles["scroll-chat-main"]} ref={chatRef}>
      {chatSection}
    </div>
  );
};

export default ScrollChat;
