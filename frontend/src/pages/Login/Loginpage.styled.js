import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: sans-serif;
  }
`;

export const Wrapper = styled.div`
  /* display: -webkit-box;
  display: -ms-flexbox; */
  display: flex;
  height: 100vh;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: space-around;

  @media (min-width: 542px) {
    height: 100vh;
    padding: 1.5rem;
    max-width: 1100px;
  }
`;

export const WrapperParagraph = styled.p`
  font-size: 0.85rem;
  margin-top: 1rem;
`;

export const Form = styled.form`
  padding: 1.5rem;
  -ms-flex-preferred-size: 100vw;
  flex-basis: 100vw;

  @media (min-width: 542px) {
    flex-basis: auto;
  }
`;

export const Heading = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

export const Label = styled.label`
  display: block;
  margin: 1.25rem 0 1rem 0;
`;

export const Input = styled.input`
  height: 40px;
  width: 100%;
  padding: 15px;
  background-color: white;
  border: 1px solid #333333;
  border-radius: 8px;

  @media (min-width: 542px) {
    width: 250px;
  }
`;

export const Button = styled.button`
  height: 40px;
  width: 100%;
  background-color: #6A9838;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  display: block;
  margin: 0 auto;
  font-weight: bold;
  margin-top: 1.5rem;
  border-radius: 8px;

  &:hover {
    filter: brightness(95%);
  }

  &:active {
    transform: scale(0.98);
  }
`;
