import React, { useEffect, useState } from 'react'
import { contactService } from '../services/contactService'
import { useNavigate, useParams } from 'react-router-dom'

export function ContactEdit() {
  const [contact, setContact] = useState(contactService.getEmptyContact())
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadContact()
  }, [])

  async function loadContact() {
    const contactId = params.id
    try {
      if (contactId) {
        const contact = await contactService.getById(contactId)
        setContact(contact)
      }
    } catch (error) {
      console.log('error:', error)
    }
  }

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

    setContact((prevContact) => ({
      ...prevContact,
      [field]: value,
    }))
  }
  async function onSaveContact(ev) {
    ev.preventDefault()
    try {
      await contactService.save(contact)
      onBack()
    } catch (error) {}
  }
  async function onRemoveContact(contactId) {
    try {
      await contactService.remove(contactId)
      onBack()
    } catch (error) {
      console.log('error:', error)
    }
  }

  function onBack() {
    navigate('/contact')
  }

  const { name, email, phone } = contact

  return (
    <section className='contact-edit'>
      <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
      <div className='action'>
        <button onClick={onBack}>Back</button>
        {contact._id && (
          <button onClick={() => onRemoveContact(contact._id)}>Remove</button>
        )}
      </div>

      <form onSubmit={onSaveContact}>
        <img src={`https://robohash.org/${contact._id}`} />
        <div>
          <label htmlFor='name'>Name</label>
          <input
            onChange={handleChange}
            value={name}
            type='text'
            name='name'
            id='name'
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            value={email}
            type='email'
            name='email'
            id='email'
          />
        </div>
        <div>
          <label htmlFor='phone'>Phone</label>
          <input
            onChange={handleChange}
            value={phone}
            type='text'
            name='phone'
            id='phone'
          />
        </div>

        <button>Save</button>
      </form>
    </section>
  )
}
