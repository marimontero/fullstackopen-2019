import React, { useState} from 'react'
import ReactDOM from 'react-dom'

const ShowNames = (persons) => {
  return persons.map(
    person => <li key={person.name}>{person.name}</li>
  )
}

const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ])

  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleAddName = (event) => {
    event.preventDefault();

    const handleCheckName = persons.some(
      person => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (handleCheckName) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons(persons.concat({name: newName}));
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddName}>
        <div>
          <strong>Name: </strong>
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{listStyleType: "none", padding: "0"}}>{ShowNames(persons)}</ul>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
