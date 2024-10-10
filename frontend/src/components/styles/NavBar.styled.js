import styled from 'styled-components';

export const Nav = styled.nav`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box; 
    position: fixed; 
    top: 0;
    left: 0;
    z-index: 1000; 
`;

export const HomeLogo = styled.div`
    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: black;
        font-size: 1.5rem;
        font-weight: bold;

        &:hover {
        color: #007bff;
        }
    }
`;

export const LogoContainer = styled.div`
    font-size: 2rem; /* For the logo icon (🍉) */
    margin-right: 0.5rem;
`;

export const Menu = styled.div`
    display: flex;
    gap: 1.5rem;

    a {
        text-decoration: none;
        color: black;
        font-size: 1rem;
        font-weight: 500;

        &:hover {
        color: #6A9838;
        }
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        color: black;

        &:hover {
        color: #6A9838;
        }
    }
`;
