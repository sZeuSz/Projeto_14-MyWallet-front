import * as yup from 'yup';

export const SignUpSchema = yup.object({
  name: yup.string().trim().min(4, "O nome precisa pelo menos 4 letras").required("Nome é obrigatório"),
  email: yup.string().email('Insira um email válido').required('Email é obrigatório'),
  password: yup.string().required("Senha obrigatória").matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial"
  ),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas não coincidem')
})