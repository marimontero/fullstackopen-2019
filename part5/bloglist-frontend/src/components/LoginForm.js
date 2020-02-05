import React from 'react'

const LoginForm = (props) => (
  <div>
    <h2>Log in into application</h2>
    <form onSubmit={props.handleLogin}>
      <div>
        Username
        <input {...props.username} />
      </div>
      <div>
        Password
        <input {...props.password} />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

export default LoginForm
