import React from 'react'

const Filter = (props) => (
  <form onSubmit={event => event.preventDefault()}>
    <strong>Filter shown with: </strong>
    <input
        value={props.filterName}
        onChange={props.handleFilter}
      />
  </form>
)

export default Filter