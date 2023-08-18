import { Link } from 'react-router-dom'

export function ContactPreview({
  contact,
  onRemoveContact,
  onSelectContactId,
}) {
  return (
    <section className='contact-preview flex'>
      <img src={`https://i.pravatar.cc/150?img=${contact._id}`} alt='' />

      <h2>{contact.name}</h2>

      <section className='actions'>
        <button className='btn' onClick={() => onRemoveContact(contact._id)}>
          X
        </button>
        <button className='btn' onClick={() => onSelectContactId(contact._id)}>
          Details
        </button>
        {/* <Link to={`/contact/${contact._id}`}> Details</Link> */}
        <Link to={`/contact/edit/${contact._id}`}> Edit</Link>
      </section>
    </section>
  )
}
