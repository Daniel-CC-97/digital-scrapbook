import { createClient as createDeliveryClient } from "contentful";
import { createClient as createManagementClient } from "contentful-management";

// Initialize the Contentful Delivery API client (for reading data)
const client = createDeliveryClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Initialize the Contentful Management API client (for writing data)
const managementClient = createManagementClient({
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_TOKEN, // Add this token in your environment variables
});

// Retrieve the list of small articles from Contentful
export const getPosts = async () => {
  const response = await client.getEntries({
    content_type: "post",
    include: 10, // Include one level of linked entries (e.g., comments)
  });

  return response.items;
};

export const addCommentToPost = async (postId, commentText, author) => {
  try {
    // Get the content space and environment from the management client
    const space = await managementClient.getSpace(
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
    );
    const environment = await space.getEnvironment(
      process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT_ID
    );

    // Step 1: Create the new comment entry
    const comment = await environment.createEntry("comments", {
      fields: {
        comment: {
          "en-US": commentText, // The text of the comment
        },
        author: {
          "en-US": author, // The author of the comment
        },
      },
    });

    // Step 2: Publish the comment
    await comment.publish(); // Publish the new comment

    // Step 3: Get the latest version of the post
    const post = await environment.getEntry(postId);

    // Ensure the comments field exists before pushing the comment
    if (!post.fields.comments) {
      post.fields.comments = { "en-US": [] }; // Initialize comments array if not present
    }

    // Link the comment to the post
    post.fields.comments["en-US"].push({
      sys: {
        type: "Link",
        linkType: "Entry",
        id: comment.sys.id,
      },
    });

    // Step 4: Update the post with the correct version
    (await post.update()).publish();

    console.log("Comment added, published, and linked to post!");
  } catch (error) {
    console.error("Error adding comment to post:", error);
  }
};

export default client;
