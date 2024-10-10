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

