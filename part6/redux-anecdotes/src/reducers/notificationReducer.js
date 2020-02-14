export const notificationChange = (notification) => {
  return {
    type: 'ADD_NOTIFICATION',
    notification
  }
}

const notificationReducer = (state = 'You voted!', action) => {
  switch(action.type){
    case 'ADD_NOTIFICATION':
      return action.notification;
    default:
      return state;
  }
}

export default notificationReducer
