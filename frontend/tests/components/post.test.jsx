import { render, screen } from "@testing-library/react";

import Post from "../../src/components/Post";

// Input:
  // all post fields
  // username and user id

// Output:
  // username
  // date created
  // message
  // number of likes

describe("Post", () => {
  test("displays the message in the component", () => {
    const id = "123";
    const message = "test message";

    render(<Post id={id} message={message} />);

    const messageEl = screen.getByTestId("message");
    expect(messageEl.textContent).toBe("test message");
  });
  
  test("displays the username in the component", () => {
    const id = "123";
    const username = "testuser";

    render(<Post id={id} username={username} />);

    const usernameEl = screen.getByTestId("user-link");
    expect(usernameEl.textContent).toBe("testuser");
  });

  test("displays the date in the component", () => {
    const id = "123";
    const date = "2024-10-03T10:44:07.120Z";

    render(<Post id={id} dateCreated={date} />);

    const dateEl = screen.getByTestId("dateCreated");
    expect(dateEl.textContent).toBe("10:44am - 03.10.24"); 
  });
  
  test("displays the date (midnight) in the component", () => {
    const id = "123";
    const date = "2024-10-03T00:00:07.120Z";

    render(<Post id={id} dateCreated={date} />);

    const dateEl = screen.getByTestId("dateCreated");
    expect(dateEl.textContent).toBe("12:00am - 03.10.24"); 
  });
  test("displays the date (1pm) in the component", () => {
    const id = "123";
    const date = "2024-10-03T13:00:07.120Z";

    render(<Post id={id} dateCreated={date} />);

    const dateEl = screen.getByTestId("dateCreated");
    expect(dateEl.textContent).toBe("1:00pm - 03.10.24"); 
  });
  
  test("displays the number of likes in the component", () => {
    const id = "123";
    const likes = "10";

    render(<Post id={id} noOfLikes={likes} />);

    const likesEl = screen.getByTestId("numberOfLikes");
    expect(likesEl.textContent).toBe("10 Likes"); 
  })
});
