import { useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"

import { login } from '../../services/auth'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Logo from '../../components/Logo'

interface TimeResponse {
  time: string
}

interface Form {
  identifier: string
  password: string
}

const schema = yup.object().shape({
  identifier: yup.string().required('Username or email is a required field'),
  password: yup.string().required('Password is a required field'),
})

function Login() {
  const isMounted = useRef(true)
  const navigate = useNavigate()
  const [form, setForm] = useState<Form>({ identifier: '', password: '' })
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({})
  const [bgImage, setBgImage] = useState('/bg/02.jpg')

  const { mutate, error, isLoading } = useMutation<TimeResponse, Error, Form>({
    mutationFn: login,
  })

  const handleLogin = async (form: Form) => {
    try {
      await schema.validate(form, { abortEarly: false })
      setErrors({})

      mutate(form, {
        onSuccess: () => {
          navigate('/')
        },
        onError: (error) => {
          console.error('Login error:', error)
          throw error
        },
      })
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const errs: { [key: string]: string } = {}
        validationError.inner.forEach(err => {
          if (err.path) errs[err.path] = err.message
        })
        setErrors(errs)
      } else {
        if ('status' in validationError && validationError.status === 401) {
        setErrors({ identifier: 'Usuário ou senha incorretos', password: 'Usuário ou senha incorretos' })
      } else {
        console.error(validationError)
      }
      }
    }
  }

  const renderRandomBackground = () => {
    const index = Math.floor(Math.random() * 5) + 1
    setBgImage(`/bg/0${index}.jpg`)
  }

  useEffect(() => {
    if (isMounted.current) {
      renderRandomBackground()
    }
    return () => {
      isMounted.current = false
    }
  }, [])

  if (isLoading) return <p>Carregando...</p>
  if (error) return <p>Erro: {error.message}</p>

  return (
    <div
      className="relative flex w-screen h-screen justify-center items-center bg-cover"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-0 backdrop-blur-xs" />

      <section className="relative z-10 flex flex-col gap-4 w-fit bg-white/90 h-fit rounded-lg px-8 py-10 items-center shadow-lg">
        <Logo showTitle />
        <Input
          label="Username or email"
          value={form.identifier}
          type="text"
          onChange={(e) => setForm({ ...form, identifier: e.target.value })}
        />
        {errors.identifier && <p style={{ color: "red" }}>{errors.identifier}</p>}
        <Input
          label="Password"
          value={form.password}
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        <Button
          variant="contained"
          onClick={() => handleLogin(form)}
          disabled={Object.values(form).some((value) => !value)}
        >
          Login
        </Button>
      </section>
    </div>
  )
}

export default Login
