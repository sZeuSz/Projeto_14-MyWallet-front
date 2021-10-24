import styled from "styled-components";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #8C11BE;

    span {
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        font-style: normal;
        font-size: 15px;
        color: #FFFFFF;
        margin: 20px 0px;
    }
    h1{
        font-family: 'Saira Stencil One', cursive;
        font-weight: 400;
        font-style: normal;
        font-size: 32px;
        color: white;
        margin-bottom: 20px;
    }
`;

export default Form;