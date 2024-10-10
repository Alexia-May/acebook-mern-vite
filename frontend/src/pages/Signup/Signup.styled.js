import styled from 'styled-components';

export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f4f4f9;
`;

export const FormContainer = styled.form`
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
`;

export const FormTitle = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    &:focus {
        border-color: #3498db;
        outline: none;
    }
`;

export const SubmitButton = styled.input`
    background-color: #3498db;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    &:hover {
        background-color: #2980b9;
    }
`;
