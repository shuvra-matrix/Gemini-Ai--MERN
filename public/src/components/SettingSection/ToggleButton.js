import styles from "./ToggleButton.module.css";

const ToggleButton = (props) => {
  const buttonMainMode = props.mode ? "on-main" : "off-main";
  const buttonRoundMode = props.mode ? "on-round" : "off-round";

  return (
    <div
      className={`${styles["btn-main"]} ${styles[buttonMainMode]}`}
      onClick={props.onClick}
    >
      <div
        className={`${styles["btn-round"]} ${styles[buttonRoundMode]}`}
      ></div>
    </div>
  );
};

export default ToggleButton;
