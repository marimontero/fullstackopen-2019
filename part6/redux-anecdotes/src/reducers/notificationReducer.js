const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const addNotification = (notification, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, seconds * 1000)
  }
}

export const removeNotification = () => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      notification: null
    })
  }
}

export default notificationReducer
