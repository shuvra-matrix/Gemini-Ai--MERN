import styles from "./PromptSection.module.css";
import { suggestPrompt } from "../../../asset";
import { useState, useEffect } from "react";
import { themeIcon } from "../../../asset";
import { useDispatch } from "react-redux";
import { chatAction } from "../../../store/chat";

const PromptSection = () => {
  const dispatch = useDispatch();
  const [randPrompt, setRandPrompt] = useState([]);
  const icon = themeIcon();

  useEffect(() => {
    const getRandomPrompts = (list) => {
      const promptsCopy = [...list];
      promptsCopy.sort(() => Math.random() - 0.5);
      return promptsCopy.slice(0, 4);
    };
    const randomSuggestions = getRandomPrompts(suggestPrompt);
    setRandPrompt(randomSuggestions);
  }, []);

  const promptOnClick = (mainText) => {
    dispatch(chatAction.suggestPromptHandler({ prompt: mainText }));
  };
  return (
    <div className={styles["prompt-main"]}>
      {randPrompt.map((p) => (
        <div
          className={styles["prompt"]}
          key={p.id}
          onClick={() => promptOnClick(p.long)}
        >
          <p>{p.sort}</p>
          <div className={styles["icon"]}>
            {icon[p.icon] ? (
              <img src={icon[p.icon]} alt="icon"></img>
            ) : (
              <img src={p.icon} alt="icon"></img>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromptSection;
