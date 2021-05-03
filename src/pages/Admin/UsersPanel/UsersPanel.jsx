import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Creators as addDataPanelActions } from '../../../redux/ducks/addDataPanel'
import { Creators as userActions } from '../../../redux/ducks/users'
import UserPanel from '../UserPanel/UserPanel'

function UsersPanel({ auth, usersState, getAllUsers, addDataPanelClose }) {
  useEffect(() => {
    if (auth.token) {
      getAllUsers(auth.token)
    }
    return () => {
      addDataPanelClose()
    }
  }, [auth.token, getAllUsers, addDataPanelClose])

  const listUsers = () => {
    return usersState.users.map((user) => (
      <UserPanel key={user._id} user={user} />
    ))
  }

  return <div>{listUsers()}</div>
}

UsersPanel.propTypes = {
  auth: PropTypes.object.isRequired,
  usersState: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  addDataPanelClose: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  usersState: state.usersReducer
})

const mapDispatchToProps = (dispatch) => ({
  addDataPanelClose: (path) => dispatch(addDataPanelActions.closePanel()),
  getAllUsers: (token) => dispatch(userActions.getAllUsers(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersPanel)
