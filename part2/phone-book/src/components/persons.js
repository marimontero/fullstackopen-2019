import React from 'react'
import Person from './person'

const Persons = ({filteredContacts}) => (
  <ul style={{listStyleType: 'none', padding: '0'}}>
    {filteredContacts.map(person => <Person key={person.name} person={person} />)}
  </ul>
)

export default Persons
