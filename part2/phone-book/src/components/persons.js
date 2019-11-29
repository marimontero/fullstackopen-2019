import React from 'react'
import Person from './person'

const Persons = (props) => (
  <ul style={{listStyleType: 'none', padding: '0'}}>
    {props.filteredContacts.map(person => <Person key={person.name} person={person} />)}
  </ul>
)

export default Persons
