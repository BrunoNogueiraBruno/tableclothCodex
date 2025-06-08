import { useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"

import { login } from '../../services/auth'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Logo from '../../components/Logo'
import { useSnackbar } from 'notistack'
import { useMediaQuery } from '@mui/material'

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

  const isMobile = useMediaQuery('(max-width:1023px)')

  const { enqueueSnackbar } = useSnackbar()

  const { mutate } = useMutation<TimeResponse, Error, Form>({
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
          console.error(`Authentication error: ${error}`)
          enqueueSnackbar("Authentication failed", {variant:"error"})

          throw error
        },
      })
    } catch (validationError) {
      console.error(`Login error: ${validationError}`)

      if (validationError instanceof yup.ValidationError) {
        const errs: { [key: string]: string } = {}
        validationError.inner.forEach(err => {
          if (err.path) errs[err.path] = err.message
        })
        setErrors(errs)

        return
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

  return (
    <div
      className="relative flex w-screen h-screen justify-center items-center bg-cover"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className={`
          absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-0 backdrop-blur-xs
          lg:from-black/60 lg:backdrop-blur-xs
      `} />

      <section
        className={`
          relative flex flex-col w-[95vw] h-full items-center shadow-l justify-between bg-gradient-to-t from-white to-transparent
          lg:bg-white/90 lg:w-fit lg:h-fit lg:rounded-lg lg:px-8 lg:py-10 lg:gap-4
        `}
      >

        {isMobile && (
          <div
            className={`
              h-full w-full bg-cover bg-top
            `}
            style={{
              backgroundImage: `url('${bgImage}')`,
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000000e6 30%)',
              maskImage: 'linear-gradient(to bottom, transparent, #000000ef 30%)',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          />
        )}

        <Logo
          showTitle
          className={`
            bg-white rounded-lg shadow-lg p-3 flex justify-center gap-6 absolute top-14
            lg:bg-transparent lg:shadow-transparent lg:gap-2 lg:static lg:p-0
          `}
          dir={isMobile ? "row-reverse" : "column"}
          titleSize={isMobile ? "1.4em" : "2em"}
          size={isMobile ? "3rem" : "5rem"}
        />
        
        <form
          onSubmit={(e) =>{e.preventDefault(); handleLogin(form)}}
          className={`
            flex flex-col gap-3 w-full px-12 py-14 
            lg:px-0 lg:py-0
            `}
        >
        <Input
          label="Username or email"
          className={`
              w-full
          `}
          value={form.identifier}
          size={isMobile ? "medium" : "small"}
          type="text"
          onChange={(e) => setForm({ ...form, identifier: e.target.value })}
        />
        {errors.identifier && <p style={{ color: "red" }}>{errors.identifier}</p>}
        <Input
          label="Password"
          className={`
              w-full
          `}
          value={form.password}
          size={isMobile ? "medium" : "small"}
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        <Button
          className={`
              w-full
          `}
          variant="contained"
          size={isMobile ? "large" : "small"}
          type="submit"
          disabled={Object.values(form).some((value) => !value)}
        >
          Login
        </Button>
        </form>
      </section>
    </div>
  )
}

export default Login
