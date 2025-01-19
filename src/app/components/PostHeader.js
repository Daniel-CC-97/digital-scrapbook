import FormatText from "./FormatText";

const PostHeader = ({ post, image }) => {
  return (
    <div
      className={`p-1 px-2 ${
        image
          ? "rounded-b-lg bg-pastelPink-light text-pastelBlue-dark"
          : "rounded-t-lg bg-pastelPink-darker text-pastelBlue-light"
      }`}
    >
      <h4
        className={`font-bold text-lg ${
          image ? "text-pastelBlue-dark" : "text-pastelBlue-light"
        }`}
      >
        {post.fields.title}
      </h4>
      {post.fields.text && <FormatText text={post.fields.text} />}
    </div>
  );
};

export default PostHeader;
