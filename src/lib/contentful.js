import { createClient as createDeliveryClient } from "contentful";
import { createClient as createManagementClient } from "contentful-management";

// Initialize the Contentful Delivery API client (for reading data)
const client = createDeliveryClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Initialize the Contentful Management API client (for writing data)
const managementClient = createManagementClient({
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_TOKEN,
});

// Retrieve the list of posts from Contentful
export const getPosts = async () => {
  const response = await client.getEntries({
    content_type: "post",
    include: 10, // Include linked entries (e.g., comments)
  });

  return response.items;
};

// Add a comment to a post
export const addCommentToPost = async (postId, commentText, author) => {
  try {
    const space = await managementClient.getSpace(
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
    );
    const environment = await space.getEnvironment(
      process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT_ID
    );

    const comment = await environment.createEntry("comments", {
      fields: {
        comment: { "en-US": commentText },
        author: { "en-US": author },
      },
    });

    await comment.publish();

    const post = await environment.getEntry(postId);

    if (!post.fields.comments) {
      post.fields.comments = { "en-US": [] };
    }

    post.fields.comments["en-US"].push({
      sys: { type: "Link", linkType: "Entry", id: comment.sys.id },
    });

    (await post.update()).publish();

    console.log("Comment added, published, and linked to post!");
  } catch (error) {
    console.error("Error adding comment to post:", error);
  }
};

export const createPost = async ({ title, images, text, author }) => {
  try {
    const space = await managementClient.getSpace(
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
    );
    const environment = await space.getEnvironment(
      process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT_ID
    );

    // Upload the images if provided
    let imageLinks = [];
    if (images && images.length > 0) {
      for (const image of images) {
        const asset = await environment.createAssetFromFiles({
          fields: {
            title: { "en-US": title },
            file: {
              "en-US": {
                contentType: image.type,
                fileName: image.name,
                file: image,
              },
            },
          },
        });

        const processedAsset = await asset.processForAllLocales();
        const publishedAsset = await processedAsset.publish();

        imageLinks.push({
          sys: {
            type: "Link",
            linkType: "Asset",
            id: publishedAsset.sys.id,
          },
        });
      }
    }

    // Create the post
    const post = await environment.createEntry("post", {
      fields: {
        title: { "en-US": title },
        images: { "en-US": imageLinks },
        text: { "en-US": text },
        author: { "en-US": author },
      },
    });

    // Publish the post
    await post.publish();
    console.log("Post created successfully!");
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
};

export default client;
