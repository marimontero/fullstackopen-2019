import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const filter = props.filter
  const anecdotes = props.anecdotes.filter(
    anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  const vote = (anecdote) => {
    props.addVote(anecdote)
    props.addNotification(`You voted '${anecdote.content}'`, 5)
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification,
  }
}

const mapDispatchToProps = {
	addVote,
	addNotification,
	removeNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes
