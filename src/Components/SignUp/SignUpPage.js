import { useHistory } from "react-router";
import Input from "../../SharedStyle/Input";
import Form from "../../SharedStyle/Form";
import ButtonSubmit from "../../SharedStyle/ButtonSubmit";
import ContainerPage from "../../SharedStyle/Container";
import { useState } from "react";
import { sendSignUpRequest } from "../../Services/mywallet";
import Swal from "sweetalert2";

export default function SignUpPage () {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState("");

    let history = useHistory();

    function signUp (e) {

        e.preventDefault();

        const body = {
            email,
            name,
            password,
            confirmPassword
        }

        setIsLoading(true);

        if(password !== confirmPassword){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Wrong password confirmation step.',
                showConfirmButton: false,
                timer: 2000
            })

            setIsLoading(false);

            return;
        }
        sendSignUpRequest (body)
            .then((res) => {
                setIsLoading(false);

                Swal.fire({
                    icon: 'success',
                    text: 'Your account was created successfully, login and join us :D.',
                    showConfirmButton: false,
                    timer: 2500
                })

                history.push('/');
            }) 
            .catch((error) => {

                setIsLoading(false);

                if(error.response.status === 400){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Invalid data, please fill in the fields correctly.',
                        showConfirmButton: false,
                        timer: 2000
                    })

                    return;
                }
                else if(error.response.status === 401){
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
    return (
        <ContainerPage>
            <Form onSubmit={signUp}>
                <h1>MyWallet</h1>
                <Input 
                    placeholder = "Name"
                    type = "text"
                    value = {name}
                    onChange = {(e) => setName(e.target.value)}
                    disabled = {isLoading}
                    minLength = "4"
                    required
                />
                <Input 
                    placeholder = "E-mail"
                    type = "email"
                    value = {email}
                    onChange = { e => setEmail(e.target.value)}
                    disabled = {isLoading}
                    pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}$"
                    required
                />
                <Input 
                    placeholder = "Senha"
                    type = "password"
                    value = {password}
                    onChange = { e => setPassword(e.target.value)}
                    disabled = {isLoading}
                    minLength = "4"
                    required  
                />
                <Input 
                    placeholder = "Confirme a senha"
                    type = "password"
                    value = {confirmPassword}
                    onChange = { e => setConfirmPassword(e.target.value)}
                    disabled = {isLoading}
                    minLength = "4"
                    required  
                />

                <ButtonSubmit>Cadastrar</ButtonSubmit>

                <span onClick={() => history.push('/')}>Já tem uma conta? Entre agora!</span>
            </Form>
        </ContainerPage>
    )
}