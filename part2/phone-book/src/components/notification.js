import React from 'react'

const Notification = (props) => {
  if (!props.notification) return null

  return (
    <div className={`alert ${ props.newError ? 'error' : 'success' }`}>
      {props.notification}
    </div>
  )
}

export default Notification