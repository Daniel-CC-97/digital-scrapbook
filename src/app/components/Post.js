const Post = ({ post }) => {
  console.log("post: ", post);
  return (
    <div>
      <h1>{post.fields.title}</h1>
    </div>
  );
};

export default Post;
