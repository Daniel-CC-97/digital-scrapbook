import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Retrieve the list of small articles from Contentful
export const getPosts = async () => {
  const response = await client.getEntries({
    content_type: "post",
    include: 10, // Include one level of linked entries (e.g., comments)
  });

  return response.items;
};

export const getComments = async () => {
  const response = await client.getEntries({
    content_type: "comments",
  });

  console.log("comments: ", response.items);

  return response.items;
};

getComments();

export default client;
