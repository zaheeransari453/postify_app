const API_BASE_URL = "https://jsonplaceholder.typicode.com";

/* Fetch all albums from the JSONPlaceholder API.
 * @returns { Promise < Array >} - A promise that resolves to an array of albums.
 */

export const fetchPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch albums");
  }
  return await response.json();
};
export const createPost = async (postData) => {
  const posts = fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: postData.title,
      body: postData.body,
      userId: postData.userId,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => json);

  return posts;
};

export const deletePost = async (postId) => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete post with id ${postId}`);
  }

  return response;
};

// api/editPost.js
export const editPost = async (postId, updatedPostData) => {
  console.log(updatedPostData);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPostData),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to update post with id ${postId}`);
  }

  return await response.json();
};
// export const fetchPosts = async () => axios.get(`${API_BASE_URL}/posts`);
export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return await response.json();
};

export const fetchCommentsApi = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments`);

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }
  // console.log(response.json());

  return await response.json();
};

export const postCommentApiCall = async (comment) => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/comments",
    {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to Post comments");
  }

  return await response.json();
};

export const fetchPhotos = async () => axios.get(`${API_BASE_URL}/photos`);
