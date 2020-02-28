const filterReducer = (state = '', action) => {

  switch (action.type) {
    case 'SET_FILTER':
      return action.data.value
    default:
      return state
  }
}

export const setFilter = value => {
  return {
      type: 'SET_FILTER',
      data: {
        value
      }
  }
}

export default filterReducer
