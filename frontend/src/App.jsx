import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import { FriendsPage } from "./pages/Friends/FriendsPage.jsx";
import { MessagesPage } from "./pages/Messages/MessagesPage.jsx";
import { SettingsPage } from "./pages/Settings/SettingsPage.jsx";

// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/feed",
    element: <FeedPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage/>,
  },
  {
    path: "/friends",
    element: <FriendsPage/>,
  },
  {
    path: "/messages",
    element: <MessagesPage/>
  },
  {
    path: "/settings",
    element: <SettingsPage/>
  },
  // {
  //   path: "/user/:user-id",
  //   element: <UserPage />
  // },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
