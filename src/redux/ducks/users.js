import { Creators as messages } from './statusMessages'
import { Creators as addDataPanel } from './addDataPanel'

// Action types
export const Types = {
  USER_REGISTER_REQUEST: 'users/USER_REGISTER_REQUEST',
  USER_REGISTER_SUCCESS: 'users/USER_REGISTER_SUCCESS',
  USER_REGISTER_FAIL: 'users/USER_REGISTER_FAIL',
  USER_UPDATE_REQUEST: 'users/USER_UPDATE_REQUEST',
  USER_UPDATE_SUCCESS: 'users/USER_UPDATE_SUCCESS',
  USER_UPDATE_FAIL: 'users/USER_UPDATE_FAIL',
  USER_RESET_KEY_REQUEST: 'users/USER_RESET_KEY_REQUEST',
  USER_RESET_KEY_SUCCESS: 'users/USER_RESET_KEY_SUCCESS',
  USER_RESET_KEY_FAIL: 'users/USER_RESET_KEY_FAIL',
  USER_DELETE_REQUEST: 'users/DELETE_REQUEST',
  USER_DELETE_SUCCESS: 'users/DELETE_SUCCESS',
  USER_DELETE_FAIL: 'users/DELETE_FAIL',
  USERS_LOADING_REQUEST: 'users/USER_LOADING_REQUEST',
  USERS_LOADING_SUCCESS: 'users/USER_LOADING_SUCCESS',
  USERS_LOADING_FAIL: 'users/USER_LOADING_FAIL'
}

// Reducer
const INITIAL_STATE = {
  attemptingToRegister: false,
  isLoading: false,
  users: []
}

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.USER_REGISTER_REQUEST:
      return { ...state, attemptingToRegister: true }

    case Types.USER_REGISTER_SUCCESS:
      return { ...state, attemptingToRegister: false }

    case Types.USER_REGISTER_FAIL:
      return { ...state, attemptingToRegister: false }

    case Types.USERS_LOADING_REQUEST:
    case Types.USER_UPDATE_REQUEST:
    case Types.USER_DELETE_REQUEST:
    case Types.USER_RESET_KEY_REQUEST:
      return { ...state, isLoading: true }

    case Types.USER_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: state.users.map((user) =>
          user._id === action.payload.id
            ? Object.assign(user, action.payload.user)
            : user
        )
      }

    case Types.USER_UPDATE_FAIL:
    case Types.USER_DELETE_FAIL:
    case Types.USER_DELETE_SUCCESS:
    case Types.USER_RESET_KEY_FAIL:
    case Types.USER_RESET_KEY_SUCCESS:
      return { ...state, isLoading: false }

    case Types.USERS_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: Object.assign([], action.payload.users)
      }

    case Types.USERS_LOADING_FAIL:
      return { ...state, isLoading: false, users: [] }

    default:
      return state
  }
}

// Actions
export const Creators = {
  addUser: (newUser, token) => {
    return async (dispatch, getState) => {
      dispatch({ type: Types.USER_REGISTER_REQUEST })

      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_API}/user/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token
            },
            body: JSON.stringify(newUser)
          }
        )
        const data = await response.json()
        if (response.ok) {
          dispatch({
            type: Types.USER_REGISTER_SUCCESS
          })
          dispatch(
            messages.setMessage({
              status: response.status,
              message: data.message
            })
          )
          dispatch(addDataPanel.closePanel())
          dispatch(Creators.getAllUsers(token))
        } else {
          dispatch({ type: Types.USER_REGISTER_FAIL })
          dispatch(
            messages.setMessage({
              status: response.status,
              message: data.message + data.error.message
            })
          )
        }
      } catch (error) {
        dispatch(addDataPanel.submitted())
        dispatch({ type: Types.USER_REGISTER_FAIL })
        dispatch(
          messages.setMessage({
            status: 503,
            message: 'Service unavailable when attempting to fetch resource.'
          })
        )
      }
    }
  },

  getAllUsers: (token) => {
    return async (dispatch) => {
      dispatch({ type: Types.USERS_LOADING_REQUEST })

      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_API}/user/all`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token
            }
          }
        )
        const data = await response.json()
        dispatch({ type: Types.USERS_LOADING_SUCCESS, payload: data })
      } catch (error) {
        dispatch({ type: Types.USERS_LOADING_FAIL })
        dispatch(
          messages.setMessage({
            status: 503,
            message: 'Service unavailable when attempting to fetch resource.'
          })
        )
      }
    }
  },

  updateUser: (user, id, token) => {
    return async (dispatch) => {
      dispatch({ type: Types.USER_UPDATE_REQUEST })

      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_API}/user/${id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token
            },
            body: JSON.stringify(user)
          }
        )
        const data = await response.json()
        if (response.ok) {
          dispatch({
            type: Types.USER_UPDATE_SUCCESS,
            payload: { user, id }
          })
        } else {
          dispatch({ type: Types.USER_UPDATE_FAIL })
          dispatch(Creators.getAllUsers(token))
        }
        dispatch(
          messages.setMessage({
            status: response.status,
            message: data.message
          })
        )
        return response.ok
      } catch (error) {
        dispatch({ type: Types.USER_UPDATE_FAIL })
        dispatch(
          messages.setMessage({
            status: 503,
            message: 'Service unavailable when attempting to fetch resource.'
          })
        )
      }
    }
  },

  deleteUser: (id, token) => {
    return async (dispatch) => {
      dispatch({ type: Types.USER_DELETE_REQUEST })
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_API}/user/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token
            }
          }
        )
        const data = await response.json()
        if (response.ok) {
          dispatch(Creators.getAllUsers(token))
          dispatch({ type: Types.USER_DELETE_SUCCESS })
        } else {
          dispatch({ type: Types.USER_DELETE_FAIL })
        }
        dispatch(
          messages.setMessage({
            status: response.status,
            message: data.message
          })
        )
      } catch (error) {
        dispatch({ type: Types.USER_DELETE_FAIL })
        dispatch(
          messages.setMessage({
            status: 503,
            message: 'Service unavailable when attempting to fetch resource.'
          })
        )
      }
    }
  },

  resetKey: (id, token) => {
    return async (dispatch) => {
      dispatch({ type: Types.USER_RESET_KEY_REQUEST })
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_API}/user/resetkey/${id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token
            }
          }
        )
        const data = await response.json()
        if (response.ok) {
          dispatch({ type: Types.USER_RESET_KEY_SUCCESS })
        } else {
          dispatch({ type: Types.USER_RESET_KEY_FAIL })
        }
        dispatch(
          messages.setMessage({
            status: response.status,
            message: data.message
          })
        )
      } catch (error) {
        dispatch({ type: Types.USER_RESET_KEY_FAIL })
        dispatch(
          messages.setMessage({
            status: 503,
            message: 'Service unavailable when attempting to fetch resource.'
          })
        )
      }
    }
  },

  test: () => {
    return async (dispatch) => {
      console.log('')
    }
  }
}
