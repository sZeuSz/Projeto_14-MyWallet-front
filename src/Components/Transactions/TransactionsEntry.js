
import Input from "../../SharedStyle/Input";
import ButtonSubmit from "../../SharedStyle/ButtonSubmit";
import ContainerPage from "../../SharedStyle/Container";
import Form from "../../SharedStyle/Form";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import UserContext from "../../Contexts/UserContext";
import styled from "styled-components";
import { sendTransictionsEntryRequest } from "../../Services/mywallet";
import Swal from "sweetalert2";
export default function TransactionsEntry () {

    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { userData, setUserData} = useContext(UserContext);

    const history = useHistory();

    useEffect(() => {
        if(userData === ""){
    
            history.push('/');
        }
    }, [userData])

    function send (e) {

        e.preventDefault();

        const body = {
            value,
            description
        }

        if(!description.trim().length){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'description can not be blank (and full space char)',
                showConfirmButton: false,
                timer: 2000
            })
            return;
        }
        setIsLoading(true);

        sendTransictionsEntryRequest(userData, body)
            .then((res) => {
                setIsLoading(false);
                history.push('/transactions')

            })
            .catch((error) => {
                setIsLoading(false);
                if(error.response.status === 400){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    return;
                }
                else if(error.response.status === 401){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    return;
                }
            })
        
    }
        

    return (
        <ContainerPage>
            <FormEntry onSubmit={send}>
                <h1>Nova Entrada</h1>   
                <Input
                    placeholder = "Valor, ex: 24.55"
                    type = "text"
                    value = {value}
                    onChange = { e => setValue(e.target.value)}
                    disabled = {isLoading}
                    pattern = "\d+(\.\d{1,2})?"
                    required                 
                />
                <Input
                    placeholder = "Descrição"
                    type = "text"
                    value = {description}
                    onChange = { e => setDescription(e.target.value)}
                    disabled = {isLoading}
                    minLength = "4"
                    required                  
                />
                <ButtonSubmit type="submit">Salvar Entrada</ButtonSubmit>
            </FormEntry>
        </ContainerPage>
    )
}

const FormEntry = styled(Form)`
    display:flex;
    justify-content: start;
    align-items: center;

    h1 {
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        font-style: normal;
        font-size: 26px;
        width: 85.93%;
        margin: 10px 0px;
    }
`;