import { useState, useEffect, useContext, Fragment } from "react";
import { useHistory } from "react-router";
import Input from "../../SharedStyle/Input";
import ButtonSubmit from "../../SharedStyle/ButtonSubmit";
import Form from "../../SharedStyle/Form";
import ContainerPage from "../../SharedStyle/Container";
import { sendSignInRequest } from "../../Services/mywallet";
import UserContext from "../../Contexts/UserContext"
import Swal from "sweetalert2";

export default function SignInPage () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { userData, setUserData } = useContext(UserContext);

    let history = useHistory();

    useEffect(() => {
        if (userData) {
            history.push("/transactions");
        }
    }, [userData])

    function signIn (e) {

        e.preventDefault();

        const body = {
            email,
            password
        }

        setIsLoading(true);
        sendSignInRequest(body)
            .then((res) => {
                setIsLoading(false);
                setUserData(res.data);
                localStorage.setItem("userData", JSON.stringify(res.data));
                history.push("/transactions");
            })
            .catch ((error) => {

                setIsLoading(false);
                
                if(!error.response){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'serverDown!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    return;
                }
                if(error.response.status === 401){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    return;
                }
                else if(error.response.status === 400){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data,
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
            <Form onSubmit={signIn}>
                <h1>MyWallet</h1>   
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
                
                <ButtonSubmit type="submit">Entrar</ButtonSubmit>

                <span onClick={() => history.push('/sign-up')}>Primeira vez? Cadastre-se!</span>
            </Form>
            
        </ContainerPage>
    );
}
