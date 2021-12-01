
import Input from "../../SharedStyle/Input";
import ButtonSubmit from "../../SharedStyle/ButtonSubmit";
import ContainerPage from "../../SharedStyle/Container";
import Form from "../../SharedStyle/Form";
import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router";
import UserContext from "../../Contexts/UserContext";
import styled from "styled-components";
import { sendTransictionsExitRequest } from "../../Services/mywallet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TransactionSchema } from "../../Schemas/TransactionSchema/TransactionSchema";
import { LoadSpin } from "../../Loadings/Loading";
import AlertContext from "../../Contexts/AlertContext";

export default function TransactionsExit () {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(TransactionSchema)
    })
    const { setType, setMessage, setShowAlert } = useContext(AlertContext);
    const [isLoading, setIsLoading] = useState(false);
    const { userData } = useContext(UserContext);

    const history = useHistory();

    const send = useCallback((data) => {
        
        const body = {
            value: data.value,
            description: data.description
        }

        setIsLoading(true);

        sendTransictionsExitRequest(userData.token, body)
            .then((res) => {
                setIsLoading(false);
                setType('Sucesso!');
                setMessage('valor de saída registrado com sucesso');
                setShowAlert(true);
                history.push('/transactions')

            })
            .catch((error) => {
                setIsLoading(false);

                if (error.response.status === 400) {
                    setType('Erro');
                    setMessage(error.response.data);
                }
                else if(error.response.status === 401){
                    setType('Erro');
                    setMessage(error.response.data);
                }
                else {
                    setType('Erro');
                    setMessage('Servidor bugou, desculpe :(...');
                }

                setShowAlert(true);
                setTimeout(() => {
                    history.push('/');
                }, 1500);
            })

    }, [history, setMessage, setShowAlert, setType, userData.token])
        

    return (
        <ContainerPage>
            <FormEntry onSubmit={handleSubmit(send)}>
                <h1>Nova Saída</h1>   
                <Input
                    placeholder = 'Valor, ex: 24.55'
                    type = 'number'
                    disabled={isLoading}
                    {...register('value')}
                />
                <span>{errors.value?.message}</span>
                <Input
                    placeholder = "Descrição"
                    type = "text"
                    disabled={isLoading}
                    {...register('description')}
                />
                <span>{errors.description?.message}</span>
                <ButtonSubmit disabled={isLoading} type="submit">{isLoading? LoadSpin : 'Salvar Saída'}</ButtonSubmit>
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