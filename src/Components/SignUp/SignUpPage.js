import { useHistory } from "react-router";
import Input from "../../SharedStyle/Input";
import Form from "../../SharedStyle/Form";
import ButtonSubmit from "../../SharedStyle/ButtonSubmit";
import ContainerPage from "../../SharedStyle/Container";
import { useContext, useState } from "react";
import { sendSignUpRequest } from "../../Services/mywallet";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadSpin } from "../../Loadings/Loading";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "../../Schemas/SignUpSchema";
import AlertContext from "../../Contexts/AlertContext";
export default function SignUpPage () {
    const [isLoading, setIsLoading] = useState(false);
    const { setType, setMessage, setShowAlert } = useContext(AlertContext);
    const history = useHistory();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(SignUpSchema)
    });

    function signUp (data) {

        const body = {
            email: data.email,
            name: data.name,
            password: data.password,
            confirmPassword: data.confirmPassword,
        }
        console.log(body)
        setIsLoading(true);

        sendSignUpRequest (body)
            .then((res) => {
                setIsLoading(false);

                setType('Sucesso');
                setMessage('Conta criada com sucesso, faça login para continuar')
                setShowAlert(true);
                
                history.push('/');
            }) 
            .catch((error) => {
                console.log(error)
                console.log(error.response.status)
                setIsLoading(false);
                if (error.response.status === 409) {
                    setType('Erro');
                    setMessage('Email já está sendo usado por outro usuário :(');
                }
                else {
                    setType('Erro');
                    setMessage('Servidor está bugado no momento :(');
                }

                setShowAlert(true);
            })

    }
    return (
        <ContainerPage>
            <Form onSubmit={handleSubmit(signUp)}>
                <h1>MyWallet</h1>
                <Input placeholder='nome' type='text' {...register('name')} />
                <span>{errors.name?.message}</span>

                <Input placeholder='email' type='email' {...register('email')} />
                <span>{errors.email?.message}</span>

                <Input placeholder='senha' type='password' {...register('password')} />
                <span>{errors.password?.message}</span>

                <Input placeholder='confirme a senha' type='password' {...register('confirmPassword')} />
                <span>{errors.confirmPassword?.message}</span>

                <ButtonSubmit type='submit'>{isLoading? LoadSpin : 'Cadastrar'}</ButtonSubmit>

                <p onClick={() => history.push('/')}>Já tem uma conta? Entre agora!</p>
            </Form>
        </ContainerPage>
    )
}