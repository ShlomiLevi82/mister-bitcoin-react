import { useState, useEffect } from 'react'
import { userService } from '../services/userService'
import { bitcoinService } from '../services/bitcoinService'
import { Link } from 'react-router-dom'

import { SignupPage } from '../pages/SignupPage'
import { MovesList } from '../cmps/MovesList'

export function HomePage() {
  const [user, setUser] = useState(null)
  const [bitcoinRate, setBitcoinRate] = useState(null)

  useEffect(() => {
    loadUser()
  }, [])

  useEffect(() => {
    if (user) loadBitcoinRate()
  }, [user])

  async function loadUser() {
    const currUser = await userService.getLoggedinUser()
    setUser(currUser)
  }

  async function loadBitcoinRate() {
    const userBitcoinRate = await bitcoinService.getRate(user.coins)
    setBitcoinRate(userBitcoinRate)
  }

  if (!user) return <div>Loadind...</div>
  return (
    <section className='home p-4 flex flex-col gap-1'>
      <section className='bit-icon flex flex-col gap-1'>
        <i className='fa-brands fa-bitcoin fa-spin '></i>
        <h1>Welcome to CryptoWallet</h1>
        <p>Securely store and manage your cryptocurrency.</p>
        <Link to='/contact'>
          <button>Get started</button>
        </Link>
      </section>
      <div className='flex items-center gap-2'>
        <img
          src='https://res.cloudinary.com/dtaiyvzq5/image/upload/v1692114168/n08tvl9liglyf7f3u3hu.png'
          alt=''
        />
        <p>
          Hello <span className='fw-bold'>{user.name}</span>
        </p>
      </div>
      <div className='flex items-center gap-2'>
        <img
          src='https://res.cloudinary.com/dtaiyvzq5/image/upload/v1692114209/w6onpyopdvjsyqwvqa32.png'
          alt=''
        />
        <p>Coins: {user.coins}</p>
      </div>
      <div className='flex items-center gap-2'>
        <img
          src='https://res.cloudinary.com/dtaiyvzq5/image/upload/v1692114221/dfyxot4ofoop9ekwvnzz.png'
          alt=''
        />
        <p>BTC: {bitcoinRate}</p>
      </div>
      {user.moves && (
        <MovesList userMoves={user.moves.slice(0, 3)} title='Last 3 moves:' />
      )}
    </section>
  )
}
