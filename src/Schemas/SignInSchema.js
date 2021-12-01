import * as yup from "yup";

export const SignInSchema = yup.object({
  email: yup.string().email('Insira um email válido').required("Email obrigatório"),
  password: yup.string().required("Senha obrigatória").matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial"
    ),
});