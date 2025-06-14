import { useNavigate } from "react-router-dom"

import Logo from "../Logo"
import { Accordion, AccordionDetails, AccordionSummary, Avatar, useMediaQuery } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { logut } from "../../services/auth"
import { useState, type SyntheticEvent } from "react"

function Header() {
    const [expand, setExpand] = useState(false)
  const navigate = useNavigate()

  const isMobile = useMediaQuery('(max-width:1023px)')

  const handleLogout = async () => {
    await logut()
    navigate("/login")
  }

  const handleNavigate = (path:string) => {
    navigate(path)
    setExpand(false)
  }

  const navItems = [
    <li
        children="Home"
        className="font-semibold cursor-pointer h-12 flex items-center"
        onClick={() => handleNavigate("/")}
    />,
    <li
        children="Users"
        className="font-semibold cursor-pointer h-12 flex items-center"
        onClick={() => handleNavigate("/users")}
    />,
    <li
        children="Categories"
        className="font-semibold cursor-pointer h-12 flex items-center"
        onClick={() => handleNavigate("/categories")}
    />,
    <li
        children="Logout"
        className="cursor-pointer h-12 flex items-center text-[.9em]"
        onClick={handleLogout}
    />
  ]

  const navBar = (
    <nav>
        <ol className="lg:flex lg:gap-4 text-2xl">
            {navItems.map((item, index) => <div key={`nav-item-${index}`}>{item}</div>)}
        </ol>
    </nav>
  )

    const handleAccordionToggle = (_event: SyntheticEvent, isExpanded: boolean) => {
      setExpand(isExpanded)
    }

    return (
        <header
            className={`
                p-2
                lg:flex lg:justify-between lg:items-center lg:px-4 lg:bg-white lg:shadow-lg
            `}
        >
            {isMobile ? (
            <Accordion expanded={expand} onChange={handleAccordionToggle}>
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
                <AccordionDetails>
                    <div className="flex justify-between p-2">
                        {navBar}
                        <Avatar
                            children="B"
                            sx={{ width: 70, height: 70 }}
                            onClick={() => handleNavigate("/profile")}
                        />
                    </div>
                </AccordionDetails>
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