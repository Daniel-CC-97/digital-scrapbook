import FormatText from "./FormatText";

const PostHeader = ({ post, image }) => {
  return (
    <div
      className={`p-1 px-2 ${
        image
          ? " bg-pastelPink-light text-pastelPink-darker"
          : " bg-pastelPink-darker text-pastelBlue-light"
      }`}
    >
      <h4
        className={`font-bold text-lg ${
          image ? "text-pastelPink-darker" : "text-pastelBlue-light"
        }`}
      >
        {post.fields.title}
      </h4>
      {post.fields.text && <FormatText text={post.fields.text} />}
    </div>
  );
};

export default PostHeader;
