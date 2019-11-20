import React, { useState} from 'react'
import ReactDOM from 'react-dom'

const ShowPerson = (persons) => {
  return persons.map(
    person => <li key={person.name}>{person.name} {person.number}</li>
  )
}

const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'34 635 981 197'}
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleAddPerson = (event) => {
    event.preventDefault();

    const handleCheckName = persons.some(
      person => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (handleCheckName) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}));
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          <strong>Name: </strong>
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <strong>Number: </strong>
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{listStyleType: "none", padding: "0"}}>{ShowPerson(persons)}</ul>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
