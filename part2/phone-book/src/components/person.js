import React from 'react'

const Person = (props) => (
  <li key={props.person.name}>{props.person.name} {props.person.number}</li>
)

export default Person