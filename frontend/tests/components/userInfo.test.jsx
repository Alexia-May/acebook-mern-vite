import { render, screen } from "@testing-library/react";

import UserInfo from "../../src/components/UserInfo";
import { expect } from "vitest";

describe("UserInfo", () => {
    test("displays first and last name in the component", () => {
        const firstName = "firstName";
        const lastName = "lastName";
      
      render(<UserInfo firstName={firstName} lastName={lastName}/>);

      const nameEL = screen.getByTestId("firstLast");
      expect(nameEL.textContent).toBe("firstName lastName");
    });

    test("displays birthday message in the component", () => {
        const birthday = "13 September";
        
        render(<UserInfo birthday={birthday}/>)

        const birthdayEL = screen.getByTestId("birthday");
        expect(birthdayEL.textContent).toBe("Wish them Happy Birthday on... 13 September")
    });
});
