import parse from "html-react-parser";

const FormatText = ({ text }) => {
  const formattedText = text.replace(/\n/g, "<br />"); // Replace newlines with <br />
  return <p>{parse(formattedText)}</p>;
};

export default FormatText;
