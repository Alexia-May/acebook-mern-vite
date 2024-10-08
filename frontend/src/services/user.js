// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getUserInfo(token, userID="") {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const newUrl = new URL(`${BACKEND_URL}/user`);
  if (userID) {
    newUrl.searchParams.append("userId",`${userID}`)
  }
  
  const response = await fetch(newUrl.toString(), requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
}

