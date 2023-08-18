import React, { useEffect, useState } from 'react'
import { userService } from '../services/userService'
import { useNavigate, useParams } from 'react-router-dom'

export function SignupPage() {
  const [user, setUser] = useState({ name: '' })
  const navigate = useNavigate()

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break
      case 'checkbox':
        value = target.checked
      default:
        break
    }
    setUser((prevContact) => ({
      ...prevContact,
      [field]: value,
    }))
  }

  function onSignup(ev) {
    ev.preventDefault()
    try {
      userService.signup(user.name)

      navigate('/')
    } catch (error) {
      console.log('error:', error)
    }
  }

  const { name } = user
  return (
    <section className='login  '>
      <h1>Signup</h1>
      <div className='flex items-center gap-2'>
        <img
          src='https://res.cloudinary.com/dtaiyvzq5/image/upload/v1692114209/w6onpyopdvjsyqwvqa32.png'
          alt=''
        />
      </div>
      <form onSubmit={onSignup}>
        <h2>Pleas enter your name</h2>
        <input
          onChange={handleChange}
          value={name}
          type='text'
          name='name'
          placeholder='Youre name ?'
        />

        <button>Sign Up</button>
      </form>
    </section>
  )
}

export default SignupPage
