import styled from 'styled-components';
import { IoExitOutline } from "react-icons/io5";
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import { useContext, useEffect, useState } from 'react';
import UserContext from "../../Contexts/UserContext";
import { useHistory } from 'react-router';
import { getTransictionsRequest, sendLogoutRequest } from '../../Services/mywallet';
import Swal from 'sweetalert2';
export default function Transactions () {

    const [data, setData] = useState(null);
    const [ld, setLd] = useState(null);
    const [name, setName] = useState("");
    const { userData, setUserData} = useContext(UserContext);

    const history = useHistory();

    useEffect(() => {
        if(userData) {
            renderTransactions();
        }
        else if(userData === ""){
    
            history.push('/');
        }
    }, [userData])

    function renderTransactions () {

        getTransictionsRequest(userData.token)
            .then((res) => {

                if(typeof(res.data) === 'string'){
                    setName(res.data);
                    setLd("pass");
                    return;
                }
                setData(res.data[0]);
                setName(res.data[0].user[0].name);
                setLd(res.data[0]);
            })
            .catch((error) => {

                if(error.response.status === 401){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email already used, try another one.',
                        showConfirmButton: false,
                        timer: 2000
                    })

                    return;
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    showConfirmButton: false,
                    timer: 2000
                })
            })
    }

    function logout() {
        sendLogoutRequest(userData.token)
        setUserData("");
        localStorage.removeItem("userData");
        history.push("/");
    }

    if(!ld){
        return ""
    }

    return (
        data !== null ?
        <Container>
            <TopBar>
                <h1>{`Olá, ${name}`}</h1> <IconExit onClick={logout}/>
            </TopBar>
            <Main>
                <List>
                    { !data ? "" : data.transactions.map((transaction,index) => <Line key={index} value={transaction.value} > <DateAndDescription><div><span className="date">{transaction.date.substring(0, 5)}</span></div><div className="descricao" ><span className="description">{transaction.description}</span></div> </DateAndDescription> <div className="final"><span className="value">{transaction.value.toFixed(2).replace('.', ',')}</span></div></Line>)}
                </List>
                <Saldo value={data.transactions.reduce(function(total, numero){ return total + numero.value; }, 0)}><span>Saldo</span> <span className="value">{data.transactions.reduce(function(total, numero){ return total + numero.value; }, 0).toFixed(2).replace('.',',')}</span></Saldo>
            </Main>
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
        :
        <Container>
            <TopBar>
                <h1>{`Olá, ${name}`}</h1> <IconExit onClick={logout}/>
            </TopBar>
            <Main value={0}>
                <h2>Não há registros de entrada ou saída</h2>
            </Main>
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

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #8C11BE;
`;

const Main = styled.main`
    width: 85.93%;
    height: 66.41%;
    display: ${props => props.value === 0 ? "flex" : "block"};
    justify-content: center;
    align-items: center;
    background-color: white;

    h2{
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: 20px;
        width: 60%;
        color: #868686;
    }
`;
const TopBar = styled.header`
    display: flex;
    justify-content: space-between;
    width: 85.93%;
    margin: 10px 0px;

    h1 {
        font-family: 'Raleway', sans-serif;
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
const ContainerFooter = styled.footer`
    display: flex;
    justify-content: space-between;
    width: 85.93%;
    margin: 10px 0px;
`;

const Button = styled.div`
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
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        font-style: normal;
        font-size: 17px;
        line-height: 20px;
        
    }
`;

const List = styled.ul`
    width: 100%;
    height: 92%;
    overflow-y: scroll;
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
`

const Saldo = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 10px;

    span {
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        font-style: normal;
        font-size: 17px;
    }

    .value{
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: 17px;
        max-width: 170px;
        overflow: hidden;
        text-overflow: ellipsis;
        color: ${props => props.value === 0 ? "#000000" : props.value > 0 ? "green" : "red"};
    }
`;

const Line = styled.li`
    display: flex;
    justify-content: space-between;
    margin: 18px 0px;

    span {
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: 16px;
        margin: 0px 10px;
    }
    .date {
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: 16px;
    }
    .descritpion{
        font-family: 'Raleway', sans-serif;
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

const MessageDiv = styled.div`
    margin: 30px 0px 0px 10px;
`;

const IconExit = styled(IoExitOutline)`
    width: 24px;
    height: 24px;
    color: white;
`;

const IconPlus = styled(IoIosAddCircleOutline)`
    width: 25px;
    height: 25px;
    margin: 15px 0px 15px 5px;
`;
const IconMinus = styled(IoIosRemoveCircleOutline)`
    width: 25px;
    height: 25px;
    margin: 15px 0px 15px 5px;
`;
const DateAndDescription = styled.div`
    display: flex;
    justify-content: space-between;
    
    .descricao {
        word-break: break-all;
        /* overflow-wrap: break-word; */
    }
`;