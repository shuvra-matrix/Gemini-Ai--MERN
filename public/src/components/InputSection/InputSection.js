import styles from "./InputSection.module.css";
import { darkIcon } from "../../asset/darkIcon";

const InputSection = () => {
  return (
    <div className={styles["input-main"]}>
      <form>
        <input
          type="text"
          placeholder="Enter a prompt here"
          name="prompt"
        ></input>
        <button type="submit">
          <img src={darkIcon.sendIcon} alt="send icon"></img>
        </button>
      </form>
    </div>
  );
};

export default InputSection;
