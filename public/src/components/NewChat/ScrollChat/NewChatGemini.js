import { marked } from "marked";
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
        __html: marked(props?.gemini),
      }}
    ></p>
  );
};

export default NewChatByGemini;
