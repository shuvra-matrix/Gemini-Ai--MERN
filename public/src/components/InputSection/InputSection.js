import styles from "./InputSection.module.css";
import { themeIcon } from "../../asset";

const InputSection = () => {
  const icon = themeIcon();
  return (
    <div className={styles["input-main"]}>
      <form>
        <input
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
