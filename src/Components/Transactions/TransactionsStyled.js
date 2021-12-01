import styled from "styled-components";
import { IoExitOutline } from "react-icons/io5";
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #8C11BE;
`;

export const Main = styled.main`
    width: 85.93%;
    height: 66.41%;
    display: ${props => props.value === 0 ? "flex" : "block"};
    justify-content: center;
    align-items: center;
    background-color: white;

    h2{
        font-weight: 400;
        font-style: normal;
        font-size: 20px;
        width: 60%;
        color: #868686;
    }
`;
export const TopBar = styled.header`
    display: flex;
    justify-content: space-between;
    width: 85.93%;
    margin: 10px 0px;

    h1 {
        font-weight: 700;
        font-style: normal;
        font-size: 26px;
        white-space: nowrap;
        width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        color: white;
    }
`;
export const ContainerFooter = styled.footer`
    display: flex;
    justify-content: space-between;
    width: 85.93%;
    margin: 10px 0px;
`;

export const Button = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 47.965%;
    height: 144px;
    border: none;
    border-radius: 5px;
    background-color: #A328D6;
    color: #FFFFFF;
    overflow-wrap: break-word;
    p{
        font-weight: 700;
        font-style: normal;
        font-size: 17px;
        line-height: 20px;
        
    }
    &:hover{
        cursor: pointer;
    }
`;

export const List = styled.ul`
    width: 100%;
    height: 84%;
    overflow-y: scroll;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
`

export const Saldo = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 40px 10px;

    span {
        font-weight: 700;
        font-style: normal;
        font-size: 17px;
    }

    .value{
        font-weight: 400;
        font-style: normal;
        font-size: 17px;
        max-width: 170px;
        overflow: hidden;
        text-overflow: ellipsis;
        color: ${props => props.value === 0 ? "#000000" : props.value > 0 ? "green" : "red"};
    }
`;

export const Line = styled.li`
    display: flex;
    justify-content: space-between;
    margin: 18px 0px;

    span {
        font-weight: 400;
        font-style: normal;
        font-size: 16px;
        margin: 0px 10px;
    }
    .date {
        font-weight: 400;
        font-style: normal;
        font-size: 16px;
    }
    .descritpion{
        font-weight: 400;
        font-style: normal;
        font-size: 16px;
    }
    .value{
        color: ${props => props.value > 0 ? "green" : "red"};
    }

    .burro{
        display: flex;
    }
`;

export const MessageDiv = styled.div`
    margin: 30px 0px 0px 10px;

    &:hover{
        cursor: pointer;
    }
`;

export const IconExit = styled(IoExitOutline)`
    width: 24px;
    height: 24px;
    color: white;

    &:hover{
        cursor: pointer;
    }
`;

export const IconPlus = styled(IoIosAddCircleOutline)`
    width: 25px;
    height: 25px;
    margin: 15px 0px 15px 5px;
`;
export const IconMinus = styled(IoIosRemoveCircleOutline)`
    width: 25px;
    height: 25px;
    margin: 15px 0px 15px 5px;
`;
export const DateAndDescription = styled.div`
    display: flex;
    justify-content: space-between;
    
    .descricao {
        word-break: break-all;
        /* overflow-wrap: break-word; */
    }
`;