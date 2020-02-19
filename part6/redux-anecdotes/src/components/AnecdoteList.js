import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const anecdotes = props.store.getState().anecdote

  const vote = (id) => {
    props.store.dispatch(
      addVote(id)
    )

    const anecdote = anecdotes.find(n => n.id === id)
    props.store.dispatch(
      addNotification(`You voted '${anecdote.content}'`
    ))
    setTimeout(() => {
      props.store.dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
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
    </div>
  )
}

export default AnecdoteList