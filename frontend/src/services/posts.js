// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getPosts(token, userId = "") {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const newUrl = new URL(`${BACKEND_URL}/posts`);
  if (userId) {
    newUrl.searchParams.append("userId", `${userId}`);
  }
  const response = await fetch(newUrl.toString(), requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
}

// function needed to create a new post
export async function createPost(token, postObject) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObject),
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions); // /posts refers to all the routes related to posts

  if (response.status !== 201) {
    throw new Error("Unable to create a post");
  } else {
    const data = await response.json();
    return data;
  }
}

// Function to delete a post
export async function deletePost(token, postId) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts/${postId}`, requestOptions);
  if (response.status !== 200) {
    const errorData = await response.json(); // Get the error response
    throw new Error(errorData.message || "Unable to delete the post");
  } else {
    let data = await response.json();
    return data.token;
  }
}