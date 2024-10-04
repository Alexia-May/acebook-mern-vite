// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getPosts(token, userID="") {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const newUrl = new URL(`${BACKEND_URL}/posts`);
  if (userID) {
    newUrl.searchParams.append("userID",`${userID}`)
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
    let data = await response.json();
    return data.token;
  }
}
