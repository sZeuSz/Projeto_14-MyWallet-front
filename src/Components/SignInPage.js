import { useState, useEffect, useContext, Fragment } from "react";
import { useHistory } from "react-router";
import Input from "../SharedStyle/Input";
import ButtonSubmit from "../SharedStyle/ButtonSubmit";
import Form from "../SharedStyle/Form";
import ContainerPage from "../SharedStyle/Container";

export default function SignInPage () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    let history = useHistory();

    return (
        <ContainerPage>
            <Form>
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
