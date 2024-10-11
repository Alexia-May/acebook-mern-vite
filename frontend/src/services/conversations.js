// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getConversations(token) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(token)
  const newUrl = new URL(`${BACKEND_URL}/conversations`);

  const response = await fetch(newUrl.toString(), requestOptions);
  
  if (response.status !== 200) {
    throw new Error("Unable to fetch conversations");
  }

  const data = await response.json();
  console.log("conversations", data)
  return data;
}

export async function createConversation(token, conversationObject) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(conversationObject),
  };
  
  const response = await fetch(`${BACKEND_URL}/conversations`, requestOptions); // /posts refers to all the routes related to posts

  if (response.status !== 201) {
    throw new Error("Unable to create a post");
  } else {
    const data = await response.json();
    return data;
  }
}
