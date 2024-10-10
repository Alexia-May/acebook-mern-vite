// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getMessages(token, conversationId) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(token);
  const newUrl = new URL(`${BACKEND_URL}/messages`);
  newUrl.searchParams.append("conversationId", `${conversationId}`);
  console.log(newUrl);

  const response = await fetch(newUrl.toString(), requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch conversations");
  }

  const data = await response.json();
  console.log("messages", data);
  return data;
}

export async function sendMessage(token, conversationId, messageObject) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageObject),
  };
  
  const response = await fetch(`${BACKEND_URL}/messages?conversationId=${conversationId}`, requestOptions); // /posts refers to all the routes related to posts

  if (response.status !== 201) {
    throw new Error("Unable to create a post");
  } else {
    const data = await response.json();
    return data;
  }
}
