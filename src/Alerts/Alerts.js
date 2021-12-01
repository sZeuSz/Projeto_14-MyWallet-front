import styled from "styled-components"

export default function AlertError({showAlert, setShowAlert, type, message}) {
    
    if (showAlert) {
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);   
    }

    return (
        <ContainerAlert showAlert={showAlert} type={type} message={message}>
            <span>{type}: {message}</span>
        </ContainerAlert>
    )
}

const ContainerAlert = styled.div`
    position: fixed;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color: ${({type}) => type === "Erro" ? '#F8D7DA' : '#D4EDDA'};
    max-width: 40%;
    width: 100%;
    height: auto;
    padding: 10px;
    left: 50%;
    bottom: 20px;
    transform: translate(-50%, 0);
    opacity: ${({ showAlert }) => showAlert ? '1' : '0'};
    z-index: ${({ showAlert }) => showAlert ? '1' : '-1'};
    transition: all 250ms linear;
    span{
        color: ${({type}) => type === "Erro" ? '#8D4549' : '#419181'};
    }
`;
