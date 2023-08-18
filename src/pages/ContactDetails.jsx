import { useEffect, useState } from 'react'
import { contactService } from '../services/contactService'
import { TransferFund } from '../cmps/TransferFund'
import { userService } from '../services/userService'
import { MovesList } from '../cmps/MovesList'

export function ContactDetails(props) {
  const { contactId, onBack } = props
  const [contact, setContact] = useState(null)
  const user = userService.getLoggedinUser()

  useEffect(() => {
    loadContact()
  }, [])

  async function loadContact() {
    try {
      const contact = await contactService.getById(contactId)
      setContact(contact)
    } catch (error) {
      console.log('error:', error)
    }
  }
  function getTime() {
    const timestamp = Date.now()
    const date = new Date(timestamp)
    return date.toLocaleString('he-IL', {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    })
  }
  const time = getTime()

  if (!contact) return <div>Loading...</div>
  return (
    <section className='contact-details-container '>
      <div className='transfer'>
        <TransferFund
          toId={contact._id}
          to={contact.name}
          at={time}
          amount={1}
        />
      </div>
      <div className='contact-details'>
        <img src={`https://i.pravatar.cc/150?img=${contact._id}`} alt='' />
        <section>
          <h3>Name: {contact.name}</h3>
        </section>
        <section>
          <h3>Email: {contact.email}</h3>
        </section>
        <section>
          <h3>Phone: {contact.phone}</h3>
        </section>
        <button className='btn' onClick={onBack}>
          Back
        </button>
      </div>
      {user.moves && (
        <MovesList
          userMoves={user.moves.filter((move) => move.toId === contact._id)}
          title='Last transfers:'
        />
      )}
    </section>
  )
}
