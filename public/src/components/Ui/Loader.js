import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles["loader-container"]}>
      <div className={styles["loader-bar"]}></div>
    </div>
  );
};

export default Loader;
