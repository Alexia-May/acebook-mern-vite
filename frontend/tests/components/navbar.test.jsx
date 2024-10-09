import { render, screen } from "@testing-library/react";
import { createMemoryRouter, MemoryRouter, RouterProvider} from "react-router-dom"; // Setup automatic routing to it without needing to login
import NavBar from "../../src/components/NavBar";
 // import userEvent from '@testing-library/user-event';

// import { ProfilePage } from "../../src/pages/Profile/ProfilePage";
// import { MessagesPage } from "../../src/pages/Messages/MessagesPage";
// import { FeedPage } from "../../src/pages/Feed/FeedPage";
// import { SettingsPage } from "../../src/pages/Settings/SettingsPage";
// import { FriendsPage } from "../../src/pages/Friends/FriendsPage";

// Navigation


describe("NavBar Component", () => {
    beforeEach(() => {
        window.localStorage.removeItem("token");
    });

test("nav element is present", () => {
    render(
        <MemoryRouter>
            <NavBar/>
        </MemoryRouter>
    );

    const nav = screen.getByRole('navigation')
    expect(nav).to.exist;
});

// test("renders the home logo", () => {
//     render(
//         <MemoryRouter>
//             <NavBar/>
//         </MemoryRouter>
//     );

//     // Check if the home logo with the emoji is rendered
//     const logoElement = screen.getByText("🍉");
//     expect(logoElement).to.exist;
//     });

test("renders all navigation links", () => {
    render(
    <MemoryRouter>
        <NavBar />
    </MemoryRouter>
    );

    // Check for each navigation link by their text content
    const homeLink = screen.getByText("Home");
    const profileLink = screen.getByText("Profile");
    const friendsLink = screen.getByText("Friends");
    const messagesLink = screen.getByText("Messages");
    const settingsLink = screen.getByText("Settings");

    // Assert that each link is in the document
    expect(homeLink).to.exist;
    expect(profileLink).to.exist;
    expect(friendsLink).to.exist;
    expect(messagesLink).to.exist;
    expect(settingsLink).to.exist;
    });

test("has correct href for each navigation link", () => {
    render(
    <MemoryRouter>
        <NavBar />
    </MemoryRouter>
    );

    expect(screen.getByText("Home").closest("a").getAttribute("href")).to.equal("/feed");
    expect(screen.getByText("Profile").closest("a").getAttribute("href")).to.equal("/profile");
    expect(screen.getByText("Friends").closest("a").getAttribute("href")).to.equal("/friends");
    expect(screen.getByText("Messages").closest("a").getAttribute("href")).to.equal("/messages");
    expect(screen.getByText("Settings").closest("a").getAttribute("href")).to.equal("/settings");
        
    });
    
    // test("each link goes to the correct page", async () => {
    //     // Render the RouterProvider with the memory router
    //     const router = createMemoryRouter([
    //         { path: "/", element: <NavBar /> },
    //         { path: "/posts", element: <FeedPage /> },
    //         { path: "/profile", element: <ProfilePage /> },
    //         { path: "/friends", element: <FriendsPage /> },
    //         { path: "/messages", element: <MessagesPage /> },
    //         { path: "/settings", element: <SettingsPage /> },
    //     ], {
    //         initialEntries: ['/profile'], // Start at the profile page
    //     });
    //     render(<RouterProvider router={router} />);
        
    //     const user = userEvent.setup();
    
    //     // Click on the "Messages" link
    //     await user.click(screen.findByText('Messages'));
    //     const heading = await screen.getByRole('heading', { level: 1 });
    //     const headingText = heading.textContent;
    //     screen.debug();
    //     expect(headingText).to.equal('Messages');
    
    //     // Click on the "Profile" link
    //     await user.click(screen.getByRole('link', { name: /profile/i }));
    //     expect(await screen.findByText('Profile')).toBeInTheDocument();
    
    //     // Click on the "Settings" link
    //     await user.click(screen.getByRole('link', { name: /settings/i }));
    //     expect(await screen.findByText('Settings')).toBeInTheDocument();
    
    //     // Click on the "Friends" link
    //     await user.click(screen.getByRole('link', { name: /friends/i }));
    //     expect(await screen.findByText('Friends')).toBeInTheDocument();
    
    //     // Click on the "Home" link (make sure this link exists)
    //     await user.click(screen.getByRole('link', { name: /home/i }));
    //     expect(await screen.findByText('Welcome to your feed!')).toBeInTheDocument(); // Adjust based on actual content in FeedPage
    // });
});