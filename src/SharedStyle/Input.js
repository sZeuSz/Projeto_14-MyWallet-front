import styled from 'styled-components';

const Input = styled.input`
    width: 85.93%;
    height: 60px;
    border: none;
    border-radius: 5px;
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    margin: 10px 0px;
    

    &::placeholder{
        color: black;
        padding-left: 4px;
    }

    &:focus{
        padding-left: 4px;
    }
`;

export default Input;