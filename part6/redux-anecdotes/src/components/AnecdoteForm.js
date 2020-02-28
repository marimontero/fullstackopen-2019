import React from 'react'
import { connect } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  const onSubmit = (e) => {
    e.preventDefault()
    props.createNewAnecdote(e.target.anecdote.value.trim())
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={onSubmit}>
        <div><input name='anecdote' type='text'/></div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createNewAnecdote }
)(AnecdoteForm)
