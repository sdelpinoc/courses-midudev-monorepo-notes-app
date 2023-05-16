export default function Note (props) {
  const { index, content, date, important, toggleImportant } = props

  const label = important
    ? 'Make not important'
    : 'Make important'

  const importantClass = important
    ? 'important'
    : ''

  return (
    <article>
      <h3>{index + 1}.- {date}</h3>
      <p aria-label="note-content" className={importantClass}>{content}</p>
      <button onClick={toggleImportant}>{label}</button>
    </article>
  )
}
