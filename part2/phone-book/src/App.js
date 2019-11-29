import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Persons from './components/persons'
import PersonForm from './components/person-form'
import axios from 'axios'

const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
    )

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
      <Filter filterName={filterName} handleFilter={handleFilter} />
      <h2>Add a new contact</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleAddPerson={handleAddPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filteredContacts={filteredContacts} />
    </div>
  )
}

export default App