"use client"

import { signInZodSchema, SignInZodSchema } from '@/schemas/signInZodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

/**
 * Tipo utilitário para o handler de envio do formulário.
 * Garante tipagem forte entre o Zod schema e o React Hook Form.
 */
export type SubmitSigninHandler = SubmitHandler<SignInZodSchema>

/**
 * Hook auxiliar para gerenciamento do formulário de login.
 *
 * Responsabilidades:
 * - Configurar o React Hook Form com o schema Zod
 * - Controlar estados de carregamento e erro
 * - Fornecer props e handlers padronizados para a view
 */
export const useSigninLib = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formProps = useForm<SignInZodSchema>({
    resolver: zodResolver(signInZodSchema), // ✅ validação declarativa
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit', // ✅ executa validação ao enviar (pode ser 'onBlur'/'onChange')
  })

  return {
    formProps,
    loading,
    setLoading,
    error,
    setError,
  }
}
