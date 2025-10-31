import { useAuthUser } from '@/contexts'
import { SignInZodSchema } from '@/schemas/signInZodSchema'

import { SubmitSigninHandler, useSigninLib } from './signin.lib'

/**
 * 🧩 Hook responsável por orquestrar o fluxo de login.
 *
 * - Integra o formulário (useSigninLib) com o contexto de autenticação (useAuthUser)
 * - Faz a submissão do login com tratamento de erros e loading
 * - Retorna props do formulário + handler do submit
 */
export const useSignin = () => {
  const { signIn } = useAuthUser()
  const { formProps, loading, setLoading, setError, error } = useSigninLib()

  /**
   * Handler de submissão do formulário de login
   * @param data Dados validados pelo Zod (email, password)
   */
  const handleSignin: SubmitSigninHandler = async (data: SignInZodSchema) => {
    try {
      setLoading(true)

      // 1️⃣ Executa o login via contexto global
      await signIn(data)

      // 2️⃣ Caso o login falhe, o contexto deve lançar um erro tratado
      // (e.g., UnauthorizedError, NetworkError, etc.)
    } catch (error: any) {
      // ✅ Tratamento de erros centralizado e user-friendly
      if (error.response?.status === 401) {
        setError('Credenciais inválidas. Verifique seu e-mail e senha.')
      } else if (error.message === 'Network Error') {
        setError('Falha na conexão. Tente novamente mais tarde.')
      } else {
        setError('Erro inesperado. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    formProps,
    handleSignin,
    loading,
    error
  }
}
