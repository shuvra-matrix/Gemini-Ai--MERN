import styles from "./InputSection.module.css";
import { themeIcon } from "../../asset";
import { sendChatData } from "../../store/chat-action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const InputSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState("");
  const previousChat = useSelector((state) => state.chat.previousChat);
  const chatHistoryId = useSelector((state) => state.chat.chatHistoryId);
  const suggestPrompt = useSelector((state) => state.chat.suggestPrompt);

  const userInputHandler = (e) => {
    setUserInput(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      sendChatData({
        user: userInput,
        gemini: "",
        isLoader: "yes",
        previousChat,
        chatHistoryId,
      })
    );
    setUserInput("");
    navigate("/app");
  };

  useEffect(() => {
    if (suggestPrompt.length > 0) {
      setUserInput(suggestPrompt);
    }
  }, [suggestPrompt]);

  const icon = themeIcon();
  return (
    <div className={styles["input-main"]}>
      <form onSubmit={onSubmitHandler}>
        <input
          onChange={userInputHandler}
          autoComplete="off"
          type="text"
          placeholder="Enter a prompt here"
          name="prompt"
          value={userInput}
        ></input>
        <button type="submit">
          <img src={icon.sendIcon} alt="send icon"></img>
        </button>
      </form>
    </div>
  );
};

export default InputSection;
