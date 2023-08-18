export function MovesList(props) {
  function formattedTime(timestamp) {
    const date = new Date(timestamp)
    const formattedDate = date.toLocaleString('he', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
    return `${formattedDate}`
  }

  if (!props.userMoves.length) return
  return (
    <section className='move-list'>
      <h3>{props.title}</h3>
      {props.userMoves.map((move, idx) => (
        <article key={idx}>
          <p>
            <i className='fa-solid fa-user'></i> To: {move.to}
          </p>
          <p>
            <i className='fa-solid fa-coins'></i> Amount: {move.amount} coins
          </p>
          <p className='time'>At: {move.at}</p>
        </article>
      ))}
    </section>
  )
}
