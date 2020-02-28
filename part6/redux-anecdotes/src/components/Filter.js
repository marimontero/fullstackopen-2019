import React from 'react'
import { setFilter } from '../reducers/filterReducer.js'

const Filter = (props) => {

  const handleChange = (event) => {
    props.store.dispatch((
      setFilter(event.target.value)
    ))
  }

  const filterValue = props.store.getState().filter

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <label>Filter: </label>
      <input value={filterValue} onChange={handleChange} />
    </div>
  )
}

export default Filter
