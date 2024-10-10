import { render, screen } from "@testing-library/react";
import CreatePost from "../../src/components/CreatePost";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { createPost } from "../../src/services/posts";

vi.mock("../../src/services/posts", () => {
  const createPostMock = vi.fn()
  return {createPost: createPostMock}
})

describe("Create Post Component" , () => {
    beforeEach(() => {
        window.localStorage.removeItem("token");
        vi.setSystemTime(new Date("2024-10-04"))
    });

    // Reuseable function to handle typing into the field.
    async function typeInArea(text) {
        const user = userEvent.setup();

        const textarea = screen.getByTestId("messageForm");
        await user.type(textarea, text);
    }

    test("Component renders", () => {
        render(
            <CreatePost/>
        );

        const title = screen.findByText("Share what is on your mind...");
        
        expect(title).to.exist;
    });

    test("Can type in textarea" , async () => {
        render(
            <CreatePost/>
        );

        await typeInArea("Hello world");
        const textarea = screen.getByTestId("messageForm");
        expect(textarea.value).toEqual("Hello world");
        
    });

    test("user completes post form, and createPost function is called with token and post object", async () => {
      window.localStorage.setItem("token", "testToken");
      render( <CreatePost />)

      const user = userEvent.setup();

      const messageInputEl = screen.getByTestId("messageForm");
      const submitButtonEl = screen.getByRole("button");
    
      await user.type(messageInputEl, "Test message.");
      await user.click(submitButtonEl);

      const testPostObject = {
        message: "Test message.",
        dateCreated: new Date("2024-10-04")
      }

      expect(createPost).toHaveBeenCalledWith("testToken", testPostObject)


    })

    // test("Can't type more tqhan 500 characters", async () => {
    //     render(
    //         <CreatePost/>
    //     );

    //     // Create a 600 length string without making it look horrible.
    //     let largeString = "";
    //     for (let i = 0; i < 600; i++){
    //         largeString += "e";
    //     }

    //     await typeInArea(largeString);

    //     await typeInArea("Hello world");
    //     const textarea = screen.getByTitle("MessageBox");
    //     expect(textarea.value.length).to.equal(500);
        
    // });

    // test("Word Counter works", async () => {
    //     render(
    //         <CreatePost/>
    //     );

    //     await typeInArea("Hello world");
    //     const counter = screen.getByText("11/500")
    //     expect(counter).to.exist;

    // })

    // test("Counter reaches a max of 500 characters", async () => {
    //     render(
    //         <CreatePost/>
    //     );

    //     // Create a 600 length string without making it look horrible.
    //     let largeString = "";
    //     for (let i = 0; i < 600; i++){
    //         largeString += "e";
    //     }

    //     await typeInArea(largeString);
    //     const counter = screen.getByText("500/500");
    //     expect(counter).to.exist;

    // });

});