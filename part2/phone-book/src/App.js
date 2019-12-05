import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Persons from './components/persons'
import PersonForm from './components/person-form'
import Notification from './components/notification'
import personsService from './service/persons'

const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ newError, setNewError ] = useState(false)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  },[])

  const handleAddPerson = event => {
    event.preventDefault()

    const add = person => {
      personsService.create(person).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification(`${person.name} was added successfully!`)
        //Remove notification
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
    }

    const modifyPerson = (id, person) => {

      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(id, person)
          .then(returnedPerson => {
            setPersons(persons.map(person => (person.id !== id ? person : returnedPerson)))
            setNewName('')
            setNewNumber('')
            setNotification(`${person.name} was updated successfully!`)
            //Remove notification
            setTimeout(() => {
              setNotification(null)
            }, 3000)
          })
          .catch(error => {
            setNewError(true)
            setNotification(`${person.name} is already deleted from the server`)
            setPersons(persons.filter(person => person.id !== id))
            setNewName('')
            setNewNumber('')
            //Remove notification
            setTimeout(() => {
              setNotification(null)
              setNewError(false)
            }, 3000)
          })
      }
    }

    const person = { name: newName, number: newNumber }
    const personFound = persons.find(p => p.name === person.name)

    personFound ? modifyPerson(personFound.id, person) : add(person)
  }

  const deletePerson = (id, name) => () => {
    if (window.confirm(`Do you want to delete ${name}?`)) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNotification(`${name} was successfully deleted!`)
        //Remove notification
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      .catch(error => {
        setNewError(true)
        setNotification(`${name} is already deleted from the server`)
        setPersons(persons.filter(person => person.id !== id))
        //Remove notification
        setTimeout(() => {
          setNotification(null)
          setNewError(false)
        }, 3000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterName(event.target.value)
  }

  const filteredContacts = filterName ?
    persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} newError={newError}/>
      <Filter filterName={filterName} handleFilter={handleFilter} />
      <h2>Add a new contact</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleAddPerson={handleAddPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filteredContacts={filteredContacts} deletePerson={deletePerson}/>
    </div>
  )
}

export default App