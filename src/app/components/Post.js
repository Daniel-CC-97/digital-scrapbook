import Image from "next/image";

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
      <div className="bg-pastelPink-light rounded-b-lg p-1">
        <h4 className="font-bold">{postTitle}</h4>
        {postText && <p>{postText}</p>}
      </div>
    </div>
  );
};

export default Post;
