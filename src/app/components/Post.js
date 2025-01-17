import Image from "next/image";
import FormatText from "./FormatText";

const Post = ({ post }) => {
  const imageUrl = post.fields.image
    ? `http:${post.fields.image.fields.file.url}`
    : null;
  const imageWidth = post.fields.image
    ? post.fields.image.fields.file.details.image.width
    : null;
  const imageHeight = post.fields.image
    ? post.fields.image.fields.file.details.image.height
    : null;
  const postTitle = post.fields.title ? post.fields.title : null;
  const postText = post.fields.text ? post.fields.text : null;

  const textClass = imageUrl
    ? "rounded-b-lg bg-pastelPink-light text-pastelBlue-dark"
    : "rounded-lg bg-pastelPink-darker text-pastelBlue-light";

  const titleClass = imageUrl
    ? "text-pastelBlue-dark"
    : "text-pastelBlue-light";

  console.log("post: ", post);
  return (
    <div className="my-4">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Hero Image"
          quality={100}
          width={imageWidth}
          height={imageHeight}
          priority={true}
          placeholder="empty"
          layout="responsive"
          className="rounded-t-lg"
        />
      ) : (
        <></>
      )}
      <div className={`p-1 px-2 ${textClass}`}>
        <h4 className={`font-bold text-lg ${titleClass}`}>{postTitle}</h4>
        {postText && <FormatText text={postText} />}
      </div>
    </div>
  );
};

export default Post;
