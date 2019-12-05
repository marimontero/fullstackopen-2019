import React from 'react'

const PersonForm = (props) => (
  <form onSubmit={props.handleAddPerson}>
    <div>
      <strong>Name: </strong>
      <input
        value={props.newName}
        onChange={props.handleNameChange}
      />
    </div>
    <div>
      <strong>Number: </strong>
      <input
        value={props.newNumber}
        onChange={props.handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
)

export default PersonForm