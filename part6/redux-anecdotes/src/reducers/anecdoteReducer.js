import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'ADD_VOTE':
      const updatedAnecdote = action.data
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      ).sort((a, b)=> b.votes - a.votes)
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch ({
      type: 'ADD_VOTE',
      data: updatedAnecdote,
    })
  }
}

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export default anecdoteReducer
