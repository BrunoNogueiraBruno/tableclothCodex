import { useNavigate } from "react-router-dom"

import Logo from "../Logo"
import baseApi from "../../services"

function Header() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await baseApi.post("/logout", null, { withCredentials: true })
    navigate("/login")
  }
    return (
        <header
            className="w-screen h-20 bg-amber-100 text-gray-900 flex items-center p-4 shadow-xl justify-between"
        >
            
            <div>
                <Logo
                    size="60px"
                    titleSize="1.4em"
                    dir="row-reverse"
                    showTitle
                />
            </div>

            <div className="flex gap-10">
            <nav>
                <div className="cursor-pointer">Users Management</div>
            </nav>

            <div
                children="Logout"
                className="font-semibold cursor-pointer"
                onClick={handleLogout}
            />
            </div>
        </header>
    )
}

export default Header