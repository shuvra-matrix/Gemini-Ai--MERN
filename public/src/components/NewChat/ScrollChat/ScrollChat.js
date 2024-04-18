import styles from "./ScrollChat.module.css";
import { commonIcon } from "../../../asset";
import { useSelector, useDispatch } from "react-redux";
import React, { useRef, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChat } from "../../../store/chat-action";
import ReplyByGemini from "./ReplyByGemini";
import NewChatByGemini from "./NewChatGemini";
import CopyBtn from "../../Ui/CopyBtn";
import "./ScrollChatModule.css";

const ScrollChat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { historyId } = useParams();
  const chatRef = useRef(null);
  const chat = useSelector((state) => state.chat.chats);
  const chatHistoryId = useSelector((state) => state.chat.chatHistoryId);
  const realTimeResponse = localStorage.getItem("realtime") || "no";
  const userImage = useSelector((state) => state.user.user.profileImg);

  const userLogo = userImage || commonIcon.avatarIcon;

  useEffect(() => {
    if (chat.length === 0 && !historyId) {
      navigate("/");
    } else if (historyId && historyId !== chatHistoryId) {
      dispatch(getChat(historyId));
    } else {
      navigate(`/app/${chatHistoryId}`);
    }
  }, [dispatch, historyId, chatHistoryId, navigate, chat]);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chat]);

  const loadText = (text) => {
    return text
      ?.replace(/\n/g, "<br>")
      ?.replace(/\*\*(.*?)\*\*/g, '<span class="h1-bold">$1</span>')
      ?.replace(/<br>\*/g, "<br><span class='list'>&#9898;</span>")
      ?.replace(/```([\s\S]*?)```/g, (_, codeBlock) => {
        let code = codeBlock
          .replace(/<br>/g, "\n")
          .replace(/</g, "&#60;")
          .replace(/>/g, "&#62;");
        let highlighted = `\`\`\`` + code + `\`\`\``;
        return `<br><pre><code>${highlighted}</code></pre>`;
      })
      ?.replace(/```([\s\S]*?)```/g, "<br><div class='email-div'>$1</div>");
  };

  const lastElemetId = chat[chat.length - 1]?.id;

  const chatSection = chat.map((c, index) => (
    <Fragment key={c?.id}>
      {!c.error ? (
        <div
          className={`${styles["single-chat"]} ${
            index === chat.length - 1 ? styles["last-single-chat"] : ""
          }`}
        >
          <div className={styles["user"]}>
            <img src={userLogo} alt="avater icon"></img>
            <p>{c.user}</p>
          </div>
          <div className={styles["gemini"]}>
            {c?.isLoader === "yes" && (
              <img src={commonIcon.geminiLaoder} alt="avater icon"></img>
            )}
            {c?.isLoader === "no" && (
              <img src={commonIcon.chatGeminiIcon} alt="avater icon"></img>
            )}
            {c?.newChat &&
            !c?.gemini.includes("```") &&
            lastElemetId === c?.id &&
            realTimeResponse === "no" ? (
              <ReplyByGemini gemini={loadText(c?.gemini)} />
            ) : (
              <NewChatByGemini gemini={loadText(c?.gemini)} />
            )}
          </div>
          {c?.gemini?.length > 0 && <CopyBtn data={c?.gemini} />}
        </div>
      ) : (
        navigate("/")
      )}
    </Fragment>
  ));

  return (
    <div className={styles["scroll-chat-main"]} ref={chatRef}>
      {chatSection}
    </div>
  );
};

export default ScrollChat;
