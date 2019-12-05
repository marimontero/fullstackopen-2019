import React from 'react'

const Person = (props) => (
  <li className='person' key={props.person.id}>
    <span className='name'>{props.person.name}</span>
    <span className='number'> {props.person.number}</span>
    <button
      id={props.person.id}
      onClick={props.deletePerson(props.person.id, props.person.name)}
    >
      Delete
    </button>
  </li>
)

export default Person