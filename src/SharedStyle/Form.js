import styled from "styled-components";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #8C11BE;

    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-weight: 700;
        font-style: normal;
        font-size: 32px;
        color: #FFFFFF;
        margin: 20px 0px;
    }
    
    span{
        color: red;
        font-weight: 700;
        font-style: normal;
        font-size: 15px;
        background-color: #ffffff;
        width: auto;
        height: auto;
        text-align: center;
        border-radius: 5px;
    }

    p{
        margin-top: 20px;
        font-weight: 700;
        font-style: normal;
        font-size: 15px;
        cursor:pointer;
        color: #ffffff;

        &:hover{
            opacity:0.5;
        }
    }
`;

export default Form;