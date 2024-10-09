import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";

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
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        {/* email */}
        <label htmlFor="email">Email:</label>
        <input
          placeholder="katherine.johnson@email.com"
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}

        {/* password */}
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Include letters and numbers"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

        {/* username */}
        <label htmlFor="username">Username:</label>
        <input
          placeholder="NASA_Kathy"
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />

        {/* first name */}
        <label htmlFor="firstName">First name:</label>
        <input
          placeholder="Katherine"
          id="firstName"
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
        />

         {/* last name */}
        <label htmlFor="lastName">Last name:</label>
        <input
          placeholder="Johnson"
          id="lastName"
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
        />

         {/* gender */}
        <label htmlFor="gender">Pronouns:</label>
        <input
          placeholder="She/her"
          id="gender"
          type="text"
          value={gender}
          onChange={handleGenderChange}
        />

         {/* birthday */}
        <label htmlFor="birthday">Birthday:</label>
        <input
          placeholder="2002-08-28"
          id="birthday"
          type="text"
          value={birthday}
          onChange={handleBirthdayChange}
        />

        {/* submitting the form */}
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
}
