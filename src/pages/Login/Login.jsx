import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Creators as authActions } from '../../redux/ducks/auth'

function Login({ authState, authLogin }) {
  const [formInputs, setFormInputs] = useState({
    username: { value: '', isValid: true },
    password: { value: '', isValid: true }
  })

  const handleFormInputs = (event) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: { value: event.target.value, isValid: true }
    })
  }

  // Check for empty inputs to sinalize the empty ones
  // and check if is valid to proceed to the authentication.
  const checkInvalidInputs = () => {
    let valid = true
    for (const key in formInputs) {
      if (!formInputs[key].value.trim()) {
        setFormInputs((prevState) => ({
          ...prevState,
          [key]: { value: '', isValid: false }
        }))
        valid = false
      }
    }
    return valid
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (checkInvalidInputs()) {
      authLogin({
        username: formInputs.username.value.trim(),
        password: formInputs.password.value
      })
    }
  }

  return (
    <div id="login-form" className="p-grid">
      <form
        className="p-shadow-3 p-col-12 p-md-4 p-md-offset-4 p-lg-2 p-lg-offset-5 p-d-flex p-flex-column"
        onSubmit={handleSubmit}
      >
        <div className="p-as-center">
          <h3>Active Database Login</h3>
          <div className="p-fluid  p-mt-2">
            <div className="p-field">
              <InputText
                className={
                  formInputs.username.isValid
                    ? 'p-inputtext-border'
                    : 'p-invalid'
                }
                value={formInputs.username.value}
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleFormInputs}
              />
            </div>
            <div className="p-field">
              <InputText
                className={
                  formInputs.password.isValid
                    ? 'p-inputtext-border'
                    : 'p-invalid'
                }
                value={formInputs.password.value}
                type="password"
                name="password"
                placeholder="Login key"
                onChange={handleFormInputs}
              />
            </div>
          </div>
          <Button
            className="btn p-button-raised p-button-secondary p-mb-3"
            type="submit"
            label="Login"
          />
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  authState: PropTypes.object.isRequired,
  authLogin: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  authState: state.authReducer
})

const mapDispatchToProps = (dispatch) => ({
  authLogin: (values) => dispatch(authActions.login(values))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
