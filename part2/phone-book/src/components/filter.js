import React from 'react'

const Filter = ({ handler: { handleFilter }, value: { filterName } }) => (
  <form onSubmit={event => event.preventDefault()}>
    <strong>Filter shown with: </strong>
    <input
        value={filterName}
        onChange={handleFilter}
      />
  </form>
)

export default Filter