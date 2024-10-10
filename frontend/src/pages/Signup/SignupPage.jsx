import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";
import { FormWrapper, FormContainer, FormTitle, Label, Input, SubmitButton} from './Signup.styled';
import { Link } from "react-router-dom";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();


  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await signup(email, password, username, firstName, lastName, gender, birthday);
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }
  }


  function handleEmailChange(event) {
    setEmail(event.target.value);
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(event.target.value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    
    if (!passwordRegex.test(event.target.value)) {
      setPasswordError('Please insert at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character');
    } else {
      setPasswordError('');
    }
  }
  

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleGenderChange(event) {
    setGender(event.target.value);
  }

  function handleBirthdayChange(event) {
    setBirthday(event.target.value);
  }

  return (
    <FormWrapper>
      <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Signup</FormTitle>

        {/* email */}
        <Label htmlFor="email">Email:</Label>
        <Input
          placeholder="katherine.johnson@email.com"
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}

        {/* password */}
        <Label htmlFor="password">Password:</Label>
        <Input
          placeholder="Include letters and numbers"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

        {/* username */}
        <Label htmlFor="username">Username:</Label>
        <Input
          placeholder="NASA_Kathy"
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />

        {/* first name */}
        <Label htmlFor="firstName">First name:</Label>
        <Input
          placeholder="Katherine"
          id="firstName"
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
        />

         {/* last name */}
        <Label htmlFor="lastName">Last name:</Label>
        <Input
          placeholder="Johnson"
          id="lastName"
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
        />

         {/* gender */}
        <Label htmlFor="gender">Pronouns:</Label>
        <Input
          placeholder="She/her"
          id="gender"
          type="text"
          value={gender}
          onChange={handleGenderChange}
        />

         {/* birthday */}
        <Label htmlFor="birthday">Birthday:</Label>
        <Input
          placeholder="2002-08-28"
          id="birthday"
          type="text"
          value={birthday}
          onChange={handleBirthdayChange}
        />

        {/* submitting the form */}
        <SubmitButton role="submit-button" id="submit" type="submit" value="Submit" />
        </FormContainer>

        <p>
        Have an account ? <Link to="/login"> Login </Link>
        </p>
    </FormWrapper>

  );
}
