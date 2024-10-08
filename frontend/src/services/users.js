const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getUser(token, userId) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const newUrl = new URL(`${BACKEND_URL}/user`);
  newUrl.searchParams.append("userId",`${userId}`)
  
  const response = await fetch(newUrl.toString(), requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch user");
  }

  const data = await response.json();
  return data;
}

export async function getAllUsers(token) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const newUrl = new URL(`${BACKEND_URL}/users`);
  
  const response = await fetch(newUrl.toString(), requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch users");
  }

  const data = await response.json();
  return data;
}
