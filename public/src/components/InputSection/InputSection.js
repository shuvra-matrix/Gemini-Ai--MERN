import styles from "./InputSection.module.css";
import { themeIcon } from "../../asset";
import { sendChatData } from "../../store/chat-action";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const InputSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState("");
  const previousChat = useSelector((state) => state.chat.previousChat);

  const userInputHandler = (e) => {
    setUserInput(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(sendChatData({ user: userInput, isLoader: "yes", previousChat }));
    navigate("/app");
  };

  const icon = themeIcon();
  return (
    <div className={styles["input-main"]}>
      <form onSubmit={onSubmitHandler}>
        <input
          onChange={userInputHandler}
          type="text"
          placeholder="Enter a prompt here"
          name="prompt"
        ></input>
        <button type="submit">
          <img src={icon.sendIcon} alt="send icon"></img>
        </button>
      </form>
    </div>
  );
};

export default InputSection;
