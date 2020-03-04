import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer.js'

const Filter = (props) => {

  const handleChange = (event) => {
    props.setFilter(event.target.value)
  }

  const filterValue = props.filter

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

export default connect(null, { setFilter })(Filter)
