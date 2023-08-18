import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { contactService } from '../services/contactService'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { ContactDetails } from './ContactDetails'

export function ContactIndex() {
  const [contacts, setContacts] = useState(null)
  const [selectedContactId, setSelectedContactId] = useState(null)
  const [filterBy, setFilterBy] = useState({
    name: '',
  })

  useEffect(() => {
    loadContacts()
  }, [filterBy])

  async function loadContacts() {
    const contacts = await contactService.query(filterBy)
    setContacts(contacts)
  }

  async function onRemoveContact(contactId) {
    try {
      await contactService.remove(contactId)
      loadContacts()
    } catch (error) {
      console.log('error:', error)
    }
  }

  function onChangeFilter(filterBy) {
    setFilterBy({ ...filterBy })
  }

  function onSelectContactId(contactId) {
    setSelectedContactId(contactId)
  }

  if (!contacts) return <div>Loading...</div>
  return (
    <section className='contact-index'>
      {!selectedContactId && (
        <>
          <ContactFilter filterBy={filterBy} onChangeFilter={onChangeFilter} />
          <div className='btn-add'>
            <Link to='/contact/edit'>Add</Link>
          </div>
          <ContactList
            onSelectContactId={onSelectContactId}
            contacts={contacts}
            onRemoveContact={onRemoveContact}
          />
        </>
      )}

      {selectedContactId && (
        <ContactDetails
          contactId={selectedContactId}
          onBack={() => onSelectContactId(null)}
        />
      )}
    </section>
  )
}
