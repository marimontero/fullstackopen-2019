import React from 'react'
import Person from './person'

const Persons = (props) => (
  <ul className='persons-list' style={{listStyleType: 'none', padding: '0'}}>
    { props.filteredContacts.map(person =>
      <Person key={person.id} person={person} id={person.id} deletePerson={props.deletePerson}/>)
    }
  </ul>
)

export default Persons
