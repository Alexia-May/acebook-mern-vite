import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStyle, Wrapper, Form, Heading, Label, Input, Button } from "./Loginpage.styled"; 
import { login } from "../../services/authentication";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      navigate("/feed");
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Heading>Login</Heading>
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          <Label htmlFor="password">Password:</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button role="submit-button" id="submit" type="submit">
            Submit
          </Button>
        </Form>
      </Wrapper>
    </>
  );
}
