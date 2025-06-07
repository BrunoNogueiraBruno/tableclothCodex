import { login } from '../../services/auth'
import { useState } from 'react'

function Login() {
  const [identifier, setIdentifier] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = async () => {
    login({identifier, password})
  }

  return (
    <div style={{display: "flex", flexDirection: "column", gap:"12px"}}>

    <label style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
      Username or email
      <input
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        type="text"
      />
    </label>

    <label style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
      Password
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
    </label>

    <button
      onClick={handleLogin}
      children="Login"
    />

    </div>
  )
}

export default Login
