import { utilService } from './utilService.js'
import { makeId } from './utilService.js'

export const contactService = {
  query,
  save,
  remove,
  getById,
  getEmptyContact,
  tryContact,
}

const STORAGE_KEY = 'contacts'

const gDefaultContacts = [
  {
    _id: '10',
    name: 'Ochoa Hyde',
    email: 'ochoahyde@renovize.com',
    phone: '+1 (968) 593-3824',
  },
  {
    _id: '12',
    name: 'Hallie Mclean',
    email: 'halliemclean@renovize.com',
    phone: '+1 (948) 464-2888',
  },
  {
    _id: '14',
    name: 'Parsons Norris',
    email: 'parsonsnorris@renovize.com',
    phone: '+1 (958) 502-3495',
  },
  {
    _id: '16',
    name: 'Rachel Lowe',
    email: 'rachellowe@renovize.com',
    phone: '+1 (911) 475-2312',
  },
  {
    _id: '18',
    name: 'Dominique Soto',
    email: 'dominiquesoto@renovize.com',
    phone: '+1 (807) 551-3258',
  },
  {
    _id: '20',
    name: 'Shana Pope',
    email: 'shanapope@renovize.com',
    phone: '+1 (970) 527-3082',
  },
  {
    _id: '22',
    name: 'Faulkner Flores',
    email: 'faulknerflores@renovize.com',
    phone: '+1 (952) 501-2678',
  },
  {
    _id: '24',
    name: 'Holder Bean',
    email: 'holderbean@renovize.com',
    phone: '+1 (989) 503-2663',
  },
  {
    _id: '26',
    name: 'Rosanne Shelton',
    email: 'rosanneshelton@renovize.com',
    phone: '+1 (968) 454-3851',
  },
  {
    _id: '28',
    name: 'Pamela Nolan',
    email: 'pamelanolan@renovize.com',
    phone: '+1 (986) 545-2166',
  },
  {
    _id: '30',
    name: 'Roy Cantu',
    email: 'roycantu@renovize.com',
    phone: '+1 (929) 571-2295',
  },
  {
    _id: '32',
    name: 'Ollie Christian',
    email: 'olliechristian@renovize.com',
    phone: '+1 (977) 419-3550',
  },
  {
    _id: '34',
    name: 'Nguyen Walls',
    email: 'nguyenwalls@renovize.com',
    phone: '+1 (963) 471-3181',
  },
  {
    _id: '36',
    name: 'Glenna Santana',
    email: 'glennasantana@renovize.com',
    phone: '+1 (860) 467-2376',
  },
  {
    _id: '38',
    name: 'Malone Clark',
    email: 'maloneclark@renovize.com',
    phone: '+1 (818) 565-2557',
  },
  {
    _id: '40',
    name: 'Floyd Rutledge',
    email: 'floydrutledge@renovize.com',
    phone: '+1 (807) 597-3629',
  },
  {
    _id: '42',
    name: 'Grace James',
    email: 'gracejames@renovize.com',
    phone: '+1 (959) 525-2529',
  },
  {
    _id: '44',
    name: 'Tanner Gates',
    email: 'tannergates@renovize.com',
    phone: '+1 (978) 591-2291',
  },
  {
    _id: '46',
    name: 'Lilly Conner',
    email: 'lillyconner@renovize.com',
    phone: '+1 (842) 587-3812',
  },
]

let gContacts = _loadContacts()

function query(filterBy) {
  let contactsToReturn = gContacts
  if (filterBy) {
    var { name } = filterBy
    name = name.toLocaleLowerCase()
    contactsToReturn = contactsToReturn.filter((contact) => {
      return contact.name.toLocaleLowerCase().includes(name)
    })
  }
  return Promise.resolve([...contactsToReturn])
}
function tryContact(id) {
  const contact = gContacts.find((contact) => contact._id === id)
  contact.batteryStatus -= 10
  return Promise.resolve()
}
function getById(id) {
  const contact = gContacts.find((contact) => contact._id === id)
  return Promise.resolve({ ...contact })
}

function remove(id) {
  const idx = gContacts.findIndex((contact) => contact._id === id)
  gContacts.splice(idx, 1)
  if (!gContacts.length) gContacts = gDefaultContacts.slice()
  utilService.store(STORAGE_KEY, gContacts)
  return Promise.resolve()
}

function save(contactToSave) {
  if (contactToSave._id) {
    const idx = gContacts.findIndex(
      (contact) => contact._id === contactToSave._id
    )
    gContacts.splice(idx, 1, contactToSave)
  } else {
    contactToSave._id = makeId()
    contactToSave.batteryStatus = 100
    gContacts.push(contactToSave)
  }
  utilService.store(STORAGE_KEY, gContacts)
  return Promise.resolve(contactToSave)
}

function getEmptyContact() {
  return {
    name: '',
    email: '',
    phone: '',
  }
}

function _loadContacts() {
  let contacts = utilService.load(STORAGE_KEY)
  if (!contacts || !contacts.length) contacts = gDefaultContacts
  utilService.store(STORAGE_KEY, contacts)
  return contacts
}
