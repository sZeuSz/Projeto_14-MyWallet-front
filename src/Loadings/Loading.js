import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
 
const LoadSpin = (
    <ReactLoading className="LoadSpin" type={"spin"} color={"black"} height={45} width={45}  />
);

export default function PageLoading() {
    
    return (
        <Main>
            {LoadSpin}
        </Main>
    )
}

const Main = styled.div`
    height: 100vh;
    width: 100%;
    background-color: #6D7CE4;
    display:flex;
    justify-content: center;
    align-items: center;
`;
 
export {
    LoadSpin,
}