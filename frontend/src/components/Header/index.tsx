import { useNavigate } from "react-router-dom"

import Logo from "../Logo"
import { Accordion, AccordionDetails, AccordionSummary, useMediaQuery } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { logut } from "../../services/auth"

function Header() {
  const navigate = useNavigate()

  const isMobile = useMediaQuery('(max-width:1023px)')

  const handleLogout = async () => {
    await logut
    navigate("/login")
  }

  const navItems = [
    <li
        children="Home"
        className="font-semibold cursor-pointer"
        onClick={() => navigate("/")}
    />,
    <li
        children="Users"
        className="font-semibold cursor-pointer"
        onClick={() => navigate("/users")}
    />,
    <li
        children="Logout"
        className="cursor-pointer"
        onClick={handleLogout}
    />
  ]

  const navBar = (
    <nav>
        <ol className="lg:flex lg:gap-4">
            {navItems.map((item, index) => <div key={`nav-item-${index}`}>{item}</div>)}
        </ol>
    </nav>
  )

    return (
        <header
            className={`
                p-2
                lg:flex lg:justify-between lg:items-center lg:px-4 lg:bg-white lg:shadow-lg
            `}
        >
            {isMobile ? (
            <Accordion>
                <AccordionSummary
                expandIcon={<MenuIcon />}
                aria-controls="mobile-header-bar-content"
                id="mobile-header-bar-header"
                >
                <Logo
                    size="2rem"
                    titleSize="1.4em"
                    dir="row-reverse"
                    showTitle={false}
                />
                </AccordionSummary>
                <AccordionDetails children={navBar} />
            </Accordion>
            ) : (
                <>
                <Logo
                    size="2rem"
                    titleSize="1.4em"
                    dir="row-reverse"
                    showTitle
                />
                {navBar}
                </>
            )}
        </header>
    )
}

export default Header