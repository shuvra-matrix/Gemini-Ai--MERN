import DOMPurify from "dompurify";
import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import "./ScrollChatModule.css";

const NewChatByGemini = (props) => {
  useEffect(() => {
    hljs.highlightAll();
  }, [props.gemini]);

  return (
    <p
      className="gemini-p"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(props?.gemini),
      }}
    ></p>
  );
};

export default NewChatByGemini;
