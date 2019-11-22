import React, { useState} from 'react'
import Filter from './components/filter'
import Persons from './components/persons'
import PersonForm from './components/person-form'

const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'34 635 981 197' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterName(event.target.value)
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

  const filteredContacts = filterName ?
    persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
		: persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={{ filterName }} handler={{ handleFilter }} />
      <h2>Add a new contact</h2>
      <PersonForm value={{ newName, newNumber }} handler={{ handleAddPerson, handleNameChange, handleNumberChange }} />
      <h2>Numbers</h2>
      <Persons filteredContacts={filteredContacts} />
    </div>
  )
}

export default App