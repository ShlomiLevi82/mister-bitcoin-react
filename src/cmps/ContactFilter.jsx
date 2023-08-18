import { useEffect, useState } from 'react'

export function ContactFilter(props) {
  const [filterBy, setFilterBy] = useState(props.filterBy)

  useEffect(() => {
    if (!filterBy) return
    props.onChangeFilter(filterBy)
  }, [filterBy])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    console.log(field, value)

    setFilterBy((prevFilterBy) => ({
      ...prevFilterBy,
      [field]: value,
    }))
  }

  if (!filterBy) return <div>Loading...</div>
  const { name } = filterBy
  return (
    <section className='contact-filter'>
      <label htmlFor='name' className='form-label'>
        Free Search
      </label>
      <input
        onChange={handleChange}
        className='form-input'
        id='name'
        type='text'
        name='name'
        value={name}
        autoComplete='off'
        placeholder='Search contact name'
      />
    </section>
  )
}
