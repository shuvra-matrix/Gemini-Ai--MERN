import styles from "./NewChat.module.css";
import PromptSection from "./PromptSection/PromptSection";

const NewChat = () => {
  return (
    <div className={styles["newchat-main"]}>
      <div className={styles["text-section"]}>
        <h1>Hello, Shuvra.</h1>
        <h2>How can I help you today?</h2>
      </div>
      <PromptSection />
    </div>
  );
};

export default NewChat;
