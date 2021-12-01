
import Input from "../../SharedStyle/Input";
import ButtonSubmit from "../../SharedStyle/ButtonSubmit";
import ContainerPage from "../../SharedStyle/Container";
import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router";
import UserContext from "../../Contexts/UserContext";
import { sendTransictionsEntryRequest } from "../../Services/mywallet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PageLoading, { LoadSpin } from "../../Loadings/Loading";
import { TransactionSchema } from "../../Schemas/TransactionSchema/TransactionSchema";
import { FormEntry } from "./TransactionsEntryStyled";
import AlertContext from "../../Contexts/AlertContext";
export default function TransactionsEntry() {
    const [isLoading, setIsLoading] = useState(false);
    const { userData } = useContext(UserContext);
    const { setType, setMessage, setShowAlert } = useContext(AlertContext);
    const history = useHistory();
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(TransactionSchema)
    });

    if (!localStorage.getItem('userData')) {
            history.push('/');
    }

    const send = useCallback((body) => {

        setIsLoading(true);

        if (!localStorage.getItem('userData')) {
            history.push('/');
            setIsLoading(false);
        }

        sendTransictionsEntryRequest(userData.token, body)
            .then((res) => {
                setIsLoading(false);
                setType('Sucesso!');
                setMessage('valor de entrada registrado com sucesso');
                setShowAlert(true);
                history.push('/transactions')
            })
            .catch((error) => {
                setIsLoading(false);
                setType('Erro');
                setMessage('Servidor está bugado :( diculpa');
                setShowAlert(true);
            })
        
    }, [history, setMessage, setShowAlert, setType, userData.token])
        
    if(!userData){
        return <PageLoading />
    }

    return (
        <ContainerPage>
            <FormEntry onSubmit={handleSubmit(send)}>
                <h1>Nova Entrada</h1>   
                <Input
                    placeholder='valor, ex: 24.55'
                    type="number"
                    disabled={isLoading}
                    {...register('value')}
                />
                <span>{errors.value?.message}</span>
                <Input
                    placeholder='Descrição'
                    type='text'
                    disabled={isLoading}
                    {...register('description')}
                />
                <span>{errors.description?.message}</span>
                <ButtonSubmit disabled={isLoading} type="submit">{isLoading? LoadSpin : 'Salvar Entrada'}</ButtonSubmit>
            </FormEntry>
        </ContainerPage>
    )
}
