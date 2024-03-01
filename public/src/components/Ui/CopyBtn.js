import styles from "./CopyBtn.module.css";
import { themeIcon } from "../../asset";
import { Fragment, useState } from "react";

const CopyBtn = (props) => {
  const [copied, setCopied] = useState(false);

  const copyHandler = () => {
    let text = props.data;
    const regex = /```([^`]+?)```/g;
    let code = text.match(regex);

    if (code) {
      text = code.reduce((acc, element) => acc + element, "");
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const icon = themeIcon();
  return (
    <Fragment>
      <div
        onClick={copyHandler}
        className={`${styles["copy-icon"]} ${
          !copied && styles["copy-icon-one"]
        }`}
      >
        <img src={icon.copyIcon} alt="copy icon"></img>
        {copied && <span className={styles["copy-message"]}>Copied!</span>}
      </div>
    </Fragment>
  );
};

export default CopyBtn;
