import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { userService } from '../services/userService'

export function AppHeader() {
  const isLoggedIn = userService.getLoggedinUser()

  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  const headerAttrs = {
    className: 'app-header flex justify-between items-center',
    id: 'Header',
  }

  function goHome() {
    navigate('/')
  }

  if (!isLoggedIn)
    return (
      <header {...headerAttrs}>
        <h1 className='logo' onClick={goHome}>
          Mister<span className='fw-bold clr-teal'>Bitcoin</span>
        </h1>
      </header>
    )

  return (
    <header {...headerAttrs}>
      <h1 className='logo' onClick={goHome}>
        Mister<span className='fw-bold clr-teal'>Bitcoin</span>
      </h1>
      <nav className='nav flex gap-2'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/contact'>Contacts</NavLink>
        <NavLink to='/about'>Stats</NavLink>
        {/* <NavLink to='/signup'>Signup</NavLink> */}
      </nav>
    </header>
  )
}
