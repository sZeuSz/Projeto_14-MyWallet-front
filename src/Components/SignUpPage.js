import { useHistory } from "react-router";
import Input from "../SharedStyle/Input";
import Form from "../SharedStyle/Form";
import ButtonSubmit from "../SharedStyle/ButtonSubmit";
import ContainerPage from "../SharedStyle/Container";
import { useState } from "react";

export default function SignUpPage () {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState("");

    let history = useHistory();

    return (
        <ContainerPage>
            <Form>
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