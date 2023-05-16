import PropTypes from 'prop-types'

import Togglable from './Togglable'

export default function LoginForm (props) {
  return (
    <header>
      <Togglable buttonLabel='login'>
        <div className="form">
          <form onSubmit={props.handleSubmit}>
            <input
              type="text"
              value={props.username}
              name="username"
              placeholder="Username"
              onChange={props.handleUsernameChange}
            />
            <input
              type="password"
              value={props.password}
              name="password"
              placeholder="Password"
              onChange={props.handlePasswordChange}
            />
            <button id="form-login-id">Login</button>
          </form>
        </div>
      </Togglable>
    </header>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string
}
