import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Retrieve the list of small articles from Contentful
export const getPosts = async () => {
  const response = await client.getEntries({
    content_type: "post",
  });

  console.log("posts: ", response.items);

  return response.items;
};

export default client;
