import DOMPurify from "dompurify";

const NewChatByGemini = (props) => {
  return (
    <p
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(props.gemini),
      }}
    ></p>
  );
};

export default NewChatByGemini;
