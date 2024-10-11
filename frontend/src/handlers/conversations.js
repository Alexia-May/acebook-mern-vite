import { createConversation } from "../services/conversations";

export async function handleCreateConversationClick(state, updateFunc, conversation) {
  const token = localStorage.getItem("token"); // getting the token from browser storage
  const loggedIn = token !== null;
  if (loggedIn) {
    try {
      const data = await createConversation(token, conversation);
      localStorage.setItem("token", data.token);
      updateFunc(!state)
    } catch (err) {
      console.log(err);
    }
  }
}