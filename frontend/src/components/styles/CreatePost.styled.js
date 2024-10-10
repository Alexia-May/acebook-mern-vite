import styled from 'styled-components';

// Container for the whole post creation area
export const CreateContainer = styled.div`
    background-color: white;
    display: flex;
    align-items: center;
    gap: 1.25rem; 
    padding: 1.25rem 1.75rem; 
    border-radius: 0.375rem; 
    margin-bottom: 1.25rem; 
    margin: 0 auto;
    width: 80%; 
`;

// Avatar Image
export const Avatar = styled.img`
    width: 8%; 
`;

// Input Container for positioning the input and image
export const InputContainer = styled.div`
    position: relative;
    width: 100%;
`;

// Input Field for the post text
export const Textarea = styled.textarea`
    width: 100%;
    padding: 0.65rem 4.3rem 0.65rem 1.25rem; 
    border: 1px solid #d1d5db; 
    border-radius: 0.5rem; 
    outline: none;
    box-sizing: border-box;
    resize: none; 
    overflow: hidden; 
`;

// Image for Add Image Icon
export const SubmitButton = styled.button`
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    
    img {
        width: 40px; 
    }

    &:hover img {
        filter: brightness(1.2); 
    }
`;
