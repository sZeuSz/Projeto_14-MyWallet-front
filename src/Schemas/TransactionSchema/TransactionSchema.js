import * as yup from 'yup';

export const TransactionSchema = yup.object({
  value: yup.number().typeError('O tipo deve ser um número').required('Valor é obrigatório').nullable('O que é iss?'),
  description: yup.string().trim().min(4, "O nome precisa pelo menos 4 letras").required("Nome é obrigatório"),
})