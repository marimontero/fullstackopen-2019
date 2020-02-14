import React from 'react'
import { addVote, createNewAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    props.store.dispatch(
      addVote(id)
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    props.store.dispatch(
      createNewAnecdote(e.target.anecdote.value.trim())
    )
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>Create new</h2>
      <form onSubmit={onSubmit}>
        <div><input name='anecdote' type='text'/></div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default App
