import DOMPurify from "dompurify";
import { useState, useEffect } from "react";
import "./ScrollChatModule.css";

const ReplyByGemini = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < props?.gemini?.length) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 5);

    return () => clearInterval(intervalId);
  }, [props?.gemini, currentIndex]);

  return (
    <p
      className="gemini-p"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(props?.gemini?.slice(0, currentIndex)),
      }}
    ></p>
  );
};

export default ReplyByGemini;
