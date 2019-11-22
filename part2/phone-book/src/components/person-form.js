import React from 'react'

const PersonForm = ({ handler: { handleAddPerson, handleNameChange, handleNumberChange }, value: { newName, newNumber } }) => (
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
)

export default PersonForm