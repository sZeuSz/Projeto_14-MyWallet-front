import { useState, useContext } from "react";
import { useHistory } from "react-router";
import Input from "../../SharedStyle/Input";
import ButtonSubmit from "../../SharedStyle/ButtonSubmit";
import Form from "../../SharedStyle/Form";
import ContainerPage from "../../SharedStyle/Container";
import { sendSignInRequest } from "../../Services/mywallet";
import UserContext from "../../Contexts/UserContext"
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadSpin } from "../../Loadings/Loading";
import { SignInSchema } from "../../Schemas/SignInSchema";
import AlertContext from "../../Contexts/AlertContext";

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState(false);
    const {setType, setMessage, setShowAlert } = useContext(AlertContext);
    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(SignInSchema)
    });

    function signIn(data) {
        setIsLoading(true);
        const body = {
            'email': data.email,
            'password': data.password
        }
        sendSignInRequest(body)
            .then((res) => {
                setIsLoading(false);
                setUserData(res.data);
                localStorage.setItem("userData", JSON.stringify(res.data));
                setType('Sucess');
                setMessage(`Bem vindo(a) :D`);
                setShowAlert(true);
                history.push("/transactions");
            })
            .catch ((error) => {
                setIsLoading(false);
                if(!error.response || !error){
                    setType('Erro');
                    setMessage('Servidor bugado');
                }

                setType('Erro');
                setMessage(error.response.data);
                setShowAlert(true);
            })

    }
    return (
        <ContainerPage>
            <Form onSubmit={handleSubmit(signIn)}>
                <h1>MyWallet</h1>

                <Input
                    placeholder='email'
                    type='email'
                    disabled={isLoading}
                    {...register('email')} />
                <span>{errors.email?.message}</span>
                    
                <Input
                    placeholder='senha'
                    type='password'
                    disabled={isLoading}
                    {...register('password')} />
                <span>{errors.password?.message}</span>

                <ButtonSubmit disabled={isLoading} type='submit'>{isLoading? LoadSpin : 'Entrar'}</ButtonSubmit>
                <p onClick={() => history.push('/sign-up')}>Primeira vez? Cadastre-se!</p>
            </Form>
        </ContainerPage>
  );
}
