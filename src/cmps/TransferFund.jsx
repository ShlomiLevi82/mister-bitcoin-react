import React, { useState } from 'react'
import { userService } from '../services/userService'

export function TransferFund({ toId, to, at, amount }) {
  const [user, setUser] = useState(userService.getLoggedinUser())
  const [transferAmount, setTransferAmount] = useState(amount)

  const handleTransfer = () => {
    console.log(
      `Transferring ${transferAmount} coins to ${to} (ID: ${toId}) at ${at}`
    )
    if (user.coins > transferAmount) {
      var updateUser = userService.addTransfer(toId, to, at, amount)
    }
    setUser(updateUser)
  }

  return (
    <section className='transfer-container'>
      <h2>Transfer Funds</h2>
      <p>Transfer to: {to}</p>
      <p>(ID: {toId})</p>
      <p>At: {at}</p>
      <label htmlFor='amount'>Amount:</label>
      <input
        type='number'
        id='amount'
        value={transferAmount}
        onChange={(e) => setTransferAmount(e.target.value)}
      />
      <button className='btn' onClick={handleTransfer}>
        Transfer
      </button>
    </section>
  )
}
