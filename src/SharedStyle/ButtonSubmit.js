import styled from "styled-components";

const ButtonSubmit = styled.button`
    width: 50%;
    max-width: 400px;
    height: 50px;
    border-radius: 5px;
    margin: 10px 0px;
    font-weight: 700;
    font-style: normal;
    font-size: 20px;
    color: white;
    border: none;
    background-color: #A328D6;
    transition: box-shadow .3s;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover{
        cursor: pointer;
        text-shadow:  0 0 11px rgba(33,33,33,.2);
        box-shadow: 0 0 11px rgba(33,33,33,.2); 
    }
`;

export default ButtonSubmit;