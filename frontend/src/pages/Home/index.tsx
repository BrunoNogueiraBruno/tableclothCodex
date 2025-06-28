import { useProtectedContext } from "../../context/ProtectedContext"

function Home() {
  const {user} = useProtectedContext()

  return (
    <div className="">
      <h2>Hello {user.first_name} {user.last_name}</h2>
    </div>
  )
}

export default Home;
