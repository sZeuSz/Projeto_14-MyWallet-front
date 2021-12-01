import { useCallback, useContext, useEffect, useState } from 'react';
import UserContext from "../../Contexts/UserContext";
import { useHistory } from 'react-router';
import { getTransictionsRequest, sendLogoutRequest } from '../../Services/mywallet';
import PageLoading from '../../Loadings/Loading';
import { Button, Container, ContainerFooter, DateAndDescription, IconExit, IconMinus, IconPlus, Line, List, Main, MessageDiv, Saldo, TopBar } from './TransactionsStyled';
import AlertContext from '../../Contexts/AlertContext';
export default function Transactions () {
    const { setType, setMessage, setShowAlert } = useContext(AlertContext);
    const [data, setData] = useState(null);
    const [name, setName] = useState("");
    const { userData, setUserData} = useContext(UserContext);
    const history = useHistory();

    const renderTransactions = useCallback(() => {
        getTransictionsRequest(userData.token)
            .then((res) => {
                if(typeof(res.data) === 'string'){
                    setName(res.data);
                    return;
                }
                setData(res.data[0]);
                setName(res.data[0].user[0].name);
            })
            .catch((error) => {
                if(error.response.status === 401){
                    setType('Erro');
                    setMessage('O token su-miu :o')
                    history.push('/');
                    return;
                }

                setType('Erro');
                setMessage('Algo deu errado no servidor, tente novamente')
                setShowAlert(true);
                history.push('/');
            })
    }, [history, setMessage, setShowAlert, setType, userData.token])

    useEffect(() => {
        if (userData){
            renderTransactions();
        }

        else if(!localStorage.getItem("userData")){
    
            history.push('/');
        }
    }, [history, name, renderTransactions, setUserData, userData, userData.token])

    function logout() {
        sendLogoutRequest(userData.token)
        setUserData("");
        localStorage.removeItem("userData");
        history.push("/");
    }

    if(!userData){
        return <PageLoading />
    }

    return (
        <Container>
            <TopBar>
                <h1>{`Olá, ${name}`}</h1> <IconExit onClick={logout}/>
            </TopBar>
                {
                !data
                    ?
                <Main value={0}>
                    <h2>Não há registros de entrada ou saída</h2>
                </Main>
                    :
                <Main>
                    <List>
                        {!data ? "" : data.transactions.map((transaction, index) => <Line key={index} value={transaction.value}> <DateAndDescription><div><span className="date">{transaction.date.substring(0, 5)}</span></div><div className="descricao"><span className="description">{transaction.description}</span></div> </DateAndDescription> <div className="final"><span className="value">{transaction.value.toFixed(2).replace('.', ',')}</span></div></Line>)}
                    </List>
                    <Saldo value={data.transactions.reduce(function (total, numero) { return total + numero.value; }, 0)}>
                        <span>Saldo</span>
                        <span className="value">
                            {data.transactions.reduce(function (total, numero) { return total + numero.value; }, 0).toFixed(2).replace('.', ',')}
                        </span>
                    </Saldo>
                </Main>
                }
            <ContainerFooter>
                <Button onClick={() => history.push('/send-transaction-entry')}>
                    <IconPlus />
                    <MessageDiv>
                        <p>Nova</p><p>Entrada</p>
                    </MessageDiv>
                </Button>
                <Button onClick={() => history.push('/send-transaction-exit')}>
                    <IconMinus />
                    <MessageDiv>
                        <p>Nova</p> <p>Saída</p>
                    </MessageDiv>
                </Button>
            </ContainerFooter>
        </Container>
    );
}