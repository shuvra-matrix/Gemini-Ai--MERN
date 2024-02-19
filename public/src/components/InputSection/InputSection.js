import styles from "./InputSection.module.css";
import { useState } from "react";
import sendIcon from "../../asset/icons8-send-48.png";

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
          <img src={sendIcon} alt="send icon"></img>
        </button>
      </form>
    </div>
  );
};

export default InputSection;
